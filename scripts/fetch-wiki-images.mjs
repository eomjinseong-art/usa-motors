/**
 * Pull Wikimedia Commons photos whose license allows commercial use.
 * Allowed: public domain, CC0, CC BY, CC BY-SA.
 * Writes data/wiki-images.json keyed by model slug, and brand-{slug} for logos.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "data", "wiki-images.json");
const UA = "USAMotorsArchive/1.0 (https://usa-motors.vercel.app; fan catalog; commercial-license photos only)";

function readQueries(file, prefix = "") {
  const text = fs.readFileSync(path.join(ROOT, file), "utf8");
  const items = [];
  const re = /slug:\s*"([^"]+)"[\s\S]*?imageQuery:\s*"([^"]+)"/g;
  let match;
  while ((match = re.exec(text))) {
    items.push({ key: `${prefix}${match[1]}`, query: match[2] });
  }
  return items;
}

function stripHtml(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function licenseOk(short = "", url = "") {
  const s = short.toLowerCase();
  const u = url.toLowerCase();
  if (s.includes("noncommercial") || s.includes("-nc") || s.includes("nc-") || /\bnc\b/.test(s)) return false;
  if (s.includes("-nd") || s.includes("nd-") || s.includes("no derivatives") || s.includes("noderiv")) return false;
  if (u.includes("by-nc") || u.includes("by-nd") || u.includes("-nc-") || u.includes("-nd")) return false;
  if (s.includes("public domain") || s.startsWith("pd") || s.includes("cc0") || s === "no restrictions") return true;
  if (u.includes("/publicdomain/") || u.includes("/zero/")) return true;
  if (s.startsWith("cc by") || u.includes("/by/") || u.includes("/by-sa/")) return true;
  return false;
}

const STOP = new Set([
  "the", "and", "car", "cars", "coupe", "sedan", "pickup", "truck", "trucks", "suv",
  "hatchback", "convertible", "wagon", "fastback", "touring", "tudor", "oval", "bowtie",
  "star", "wing", "arrowhead", "ship", "rocket", "red", "turbo", "compact", "heavy",
  "duty", "dually", "classic", "estate", "race", "grille", "minivan", "crossover",
]);

const DISTRACTORS = [
  "mustang", "camaro", "silverado", "blazer", "equinox", "cherokee", "firebird",
  "charger", "freemont", "tonale", "antara", "falcon", "grand", "monza gt",
];

const LOGO_REJECT = [
  "electric", "university", "laboratory", "rockstar", "building", "chronicle",
  "district", "foundation", "owners", "ascii", "daimler", "crossfire", "missouri",
  "dvd", "utc", "haney", "engineering", "associates", "camaro", "corvette", "semi", "mobile",
];

function norm(value = "") {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function tokens(query, { logo = false } = {}) {
  const skip = logo ? new Set(["the", "and"]) : STOP;
  return query
    .toLowerCase()
    .split(/[^a-z0-9-]+/)
    .filter((token) => token.length > 1 && !skip.has(token));
}

function badTitle(title = "") {
  return /\b(logo|icon|diagram|blueprint|advertisement|advert|poster|map|signature|dragster)\b|coat of arms|interior only|engine bay|\bengine\b/i.test(title);
}

function vehicleTitleOk(title, query) {
  const raw = title.toLowerCase();
  const folded = norm(title);
  const needed = tokens(query);
  if (!needed.length || !needed.every((token) => folded.includes(norm(token)))) return false;
  if (badTitle(title)) return false;
  if (/\b(concept|prototype)\b/i.test(raw) && !/\b(concept|prototype)\b/i.test(query)) return false;
  const foldedQuery = norm(query);
  return !DISTRACTORS.some((word) => folded.includes(norm(word)) && !foldedQuery.includes(norm(word)));
}

function logoTitleOk(title, query) {
  const raw = title.toLowerCase().replace(/^file:/, "");
  const folded = norm(title);
  const needed = tokens(query, { logo: true });
  if (!needed.length || !needed.every((token) => folded.includes(norm(token)))) return false;
  const brand = needed[0];
  if (!new RegExp(`(?:^|[^a-z0-9])${brand}(?:[^a-z0-9]|$)`, "i").test(raw)) return false;
  return !LOGO_REJECT.some((word) => new RegExp(`\\b${word}\\b`, "i").test(raw));
}

function toImage(page) {
  const info = page.imageinfo?.[0];
  if (!info) return null;
  const title = page.title || "";
  const meta = info.extmetadata || {};
  const short = meta.LicenseShortName?.value || "";
  const licenseUrl = meta.LicenseUrl?.value || "";
  if (!licenseOk(short, licenseUrl)) return null;
  const author = stripHtml(meta.Artist?.value || meta.Credit?.value || "") || "Wikimedia Commons";
  const fileName = title.replace(/^File:/, "").replace(/ /g, "_");
  return {
    url: info.thumburl || info.url,
    pageUrl: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(fileName)}`,
    author: author.slice(0, 180),
    license: stripHtml(short) || "Wikimedia Commons",
    licenseUrl: licenseUrl || undefined,
    title,
    mime: info.mime || "",
    size: info.size || 0,
  };
}

async function search(query, { logo = false } = {}) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("generator", "search");
  const titled = tokens(query, { logo }).map((token) => `intitle:${token}`).join(" ");
  url.searchParams.set("gsrsearch", titled || query);
  url.searchParams.set("gsrnamespace", "6");
  url.searchParams.set("gsrlimit", "20");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|extmetadata|mime|size");
  url.searchParams.set("iiurlwidth", "1280");
  const response = await fetch(url, { headers: { "User-Agent": UA, "Api-User-Agent": UA } });
  if (!response.ok) throw new Error(`commons ${response.status}`);
  const data = await response.json();
  const pages = Object.values(data.query?.pages ?? {});
  const matches = [];
  for (const page of pages) {
    const image = toImage(page);
    if (!image) continue;
    if (!/^image\/(jpeg|png|webp|svg\+xml)$/.test(image.mime)) continue;
    if (logo) {
      if (image.size < 800 || image.size > 1_500_000) continue;
      if (!logoTitleOk(image.title, query)) continue;
      matches.push(image);
      continue;
    }
    if (image.mime === "image/svg+xml") continue;
    if (image.size < 20_000) continue;
    if (!vehicleTitleOk(image.title, query)) continue;
    matches.push(image);
  }
  if (!matches.length) return null;
  if (logo) {
    const brand = tokens(query, { logo: true })[0] || "";
    const rank = { "image/svg+xml": 0, "image/png": 1, "image/webp": 2, "image/jpeg": 3 };
    const score = (image) => {
      const raw = image.title.toLowerCase().replace(/^file:/, "");
      let value = 0;
      if (new RegExp(`^${brand}\\b`, "i").test(raw)) value += 5;
      if (raw.includes("motor")) value += 2;
      return value;
    };
    matches.sort((a, b) => score(b) - score(a) || (rank[a.mime] ?? 9) - (rank[b.mime] ?? 9) || b.size - a.size);
  }
  const chosen = matches[0];
  delete chosen.mime;
  delete chosen.size;
  return chosen;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const targets = [
  ...readQueries("data/models/ford.ts"),
  ...readQueries("data/models/chevrolet.ts"),
  ...readQueries("data/models/stellantis.ts"),
  ...readQueries("data/models/luxury.ts"),
  ...readQueries("data/models/rest.ts"),
  ...readQueries("data/brands.ts", "brand-"),
];

const existing = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
let found = 0;
for (const target of targets) {
  const logo = target.key.startsWith("brand-");
  const current = existing[target.key];
  const stillGood = current?.url && (logo ? logoTitleOk(current.title || "", target.query) : vehicleTitleOk(current.title || "", target.query));
  if (stillGood && !(logo && (/\.jpe?g$/i.test(current.title || "") || /motto/i.test(current.title || "")))) {
    found += 1;
    continue;
  }
  if (current) delete existing[target.key];
  try {
    const image = await search(target.query, { logo });
    if (image) {
      existing[target.key] = image;
      found += 1;
      console.log("ok", target.key, image.license);
    } else {
      console.log("miss", target.key);
    }
  } catch (error) {
    console.log("err", target.key, error.message);
  }
  fs.writeFileSync(OUT, JSON.stringify(existing, null, 2));
  await sleep(250);
}

console.log(`saved ${found}/${targets.length}`);

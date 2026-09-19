import { chromium } from "playwright-core";
import fs from "fs";

const SP = "C:/Users/email/AppData/Local/Temp/claude/C--Users-email/bf09beb6-9aec-4cb4-a734-a52478b7d6bc/scratchpad";
const OUT = `${SP}/ugc2`;
const ARTDIR = "D:/Documents/New project/MyrieHQ-site/public/store/catalog-30";
fs.mkdirSync(OUT, { recursive: true });

// The orange retro pair is being dropped from the store, so it needs no shots.
const queue = JSON.parse(fs.readFileSync(`${SP}/ugc-queue.json`, "utf8"))
  .filter((q) => !["c30-24", "c30-25"].includes(q.key));

const GARMENT = { TEE: "t-shirt", HOODIE: "pullover hoodie", CREW: "crewneck sweatshirt" };

// The Lost Jamaican is a Jamaican brand, so the casting leads Caribbean and
// Black and the rest reflects a real mixed customer base. Dad designs get men,
// nurse and dog-mom designs get women, and Retired 2026 gets someone who would
// actually be retiring.
const CAST = {
  "c30-01": "a beautiful Jamaican woman, 27, deep brown skin with a natural glow, long natural curls worn loose",
  "c30-02": "a handsome Jamaican man, 34, medium-dark skin, short locs, neat beard",
  "c30-03": "a warm Black woman, 31, rich dark skin, big natural afro worn loose",
  "c30-04": "a handsome Black man, 30, deep skin, close fade and a trimmed beard",
  "c30-05": "a freckled mixed-race Caribbean woman, 26, golden-brown skin, loose curly hair",
  "c30-06": "a handsome Jamaican man, 29, dark skin, shoulder-length locs worn loose",
  "c30-07": "a beautiful Black woman, 33, deep even skin, long braids worn loose",
  "c30-08": "a Jamaican man, 28, athletic, dark skin, short twists",
  "c30-09": "a beautiful Jamaican woman, 25, warm brown skin, long straightened hair worn down",
  "c30-10": "a handsome Black man, 32, deep skin, high-top curls",
  "c30-11": "a warm Latina woman, 35, olive skin with freckles, long dark wavy hair worn down",
  "c30-12": "a beautiful Black woman, 29, dark skin, shoulder-length natural curls",
  "c30-14": "a handsome mixed-race Caribbean man, 38, light-brown skin, salt-and-pepper stubble",
  "c30-16": "a handsome white man, 31, light stubble, messy brown hair",
  "c30-18": "a beautiful South Asian woman, 28, warm brown skin, long black hair worn loose",
  "c30-21": "a beautiful Jamaican woman, 24, dark skin, voluminous natural curls",
  "c30-22": "a warm Black woman, 58, greying natural hair worn loose, laugh lines, radiant and full of life",
  "c30-23": "a beautiful white French woman, 27, freckles across her nose, loose windblown brown hair",
  "c30-27": "a handsome Black man, 27, athletic build, deep skin, short natural hair",
  "c30-28": "a beautiful East Asian woman, 26, long black hair worn loose, warm smile",
  "c30-30": "a beautiful Jamaican woman, 30, deep glowing skin, long natural curls worn down",
};

const SCENE = [
  "a sunlit tree-lined street with greenery behind",
  "a quiet park path in late afternoon",
  "a weathered painted wall across the street behind",
  "a coastal walkway with distant sea and palms behind",
  "a pavement outside a cafe with warm shopfront light behind",
  "a garden courtyard with plants and dappled sun behind",
];


/** A shirt that says "Dad" must not be worn by a woman in the photo. */
function castMismatch(title, who) {
  const t = title.toLowerCase();
  const male = /(man|male|handsome|his|he)/.test(who);
  if (/dad|father/.test(t) && !male) return `"${title}" needs a man`;
  if (/mom|mother/.test(t) && male) return `"${title}" needs a woman`;
  return null;
}

function buildPrompt(item, who, scene) {
  return [
    "Unretouched documentary portrait photograph of a real person. Canon EOS R5, 85mm f/1.2 wide open, 1/500s, ISO 200.",
    `Use the attached artwork as the exact graphic printed on the ${GARMENT[item.kind] || "t-shirt"}, reproduced precisely.`,
    `${who}.`,
    // Realism alone reads as a mugshot; the smile is what makes it inviting.
    "EXPRESSION IS THE POINT: caught mid-laugh, a real warm genuine smile that crinkles the eye corners and lifts the cheeks, teeth just showing, eyes bright and sparkling and locked on the viewer as if they know them. Full of life, warmth and personality, someone you would want to talk to. Never blank, never neutral, never vacant.",
    // Faces read fake because they are too symmetrical and too even, not because they are young.
    "ULTRA REALISTIC FACE: naturally ASYMMETRIC the way real faces are, one eye slightly smaller, eyebrows not matching, nose not perfectly straight, smile higher on one side.",
    "Skin has real structure at close range: open pores on the nose and cheeks, natural sheen on the forehead and nose tip with matte cheeks, a tiny blemish, a small mole, uneven undertone, fine peach fuzz along the jaw catching the light, laugh lines from the genuine smile.",
    "Young and healthy for their age, NOT prematurely aged, no eye bags, no tiredness.",
    "Eyes wet and alive with visible iris fibres, a bright window catchlight in each, individual eyelashes of uneven length. Lips with fine natural texture, no gloss. Loose baby hairs at the hairline.",
    "HAIR COMPLETELY DOWN AND LOOSE over the shoulders, windblown and a little messy. Absolutely NOT tied back, NOT in a ponytail, NOT half-up, NOT pinned. No makeup or barely any.",
    "NO airbrushing, NO skin smoothing, NO beauty filter, NO waxy plastic skin.",
    "Standing SQUARE TO THE CAMERA, shoulders level, facing straight forward, looking directly into the lens, so the whole graphic is flat and fully readable.",
    `Outdoors: ${scene}, thrown far out of focus into soft creamy bokeh by the wide aperture. Warm late-afternoon sun raking across the face, soft natural shadows, subtle vignetting, fine natural grain.`,
    "Indistinguishable from a real photograph taken by a real photographer. Not a render, not CGI, not a studio shoot. Photorealistic, square 1:1.",
  ].join(" ");
}

/** Grok also renders the attached reference and a noisy interim frame; take
 *  neither. Only a settled, square, non-reference image counts. */
async function pickRender(page) {
  return page.evaluate(() => {
    const list = [...document.querySelectorAll("img")]
      .map((im) => ({ s: im.currentSrc || im.src, w: im.naturalWidth, h: im.naturalHeight, rw: Math.round(im.getBoundingClientRect().width) }))
      .filter((o) => o.w > 500 && /assets\.grok\.com|imagine-public/.test(o.s))
      .filter((o) => !(o.w === 1600 && o.h === 1600))
      .filter((o) => Math.abs(o.w / o.h - 1) < 0.15)
      .sort((a, c) => c.rw - a.rw);
    return list[0] ? list[0].s : null;
  });
}

const browser = await chromium.connectOverCDP("http://127.0.0.1:9223");
const ctx = browser.contexts()[0];
let done = 0;
const failed = [];

for (const [n, item] of queue.entries()) {
  const dest = `${OUT}/${item.key}.jpg`;
  if (fs.existsSync(dest)) { console.log("skip", item.key); continue; }
  const art = `${ARTDIR}/${item.file}`;
  if (!fs.existsSync(art)) { failed.push([item.key, "no art"]); continue; }

  const who = CAST[item.key] || "a beautiful Jamaican woman, 28, deep skin, natural curls worn down";
  const bad = castMismatch(item.title, who);
  if (bad) { failed.push([item.key, bad]); console.log("SKIP (cast mismatch)", item.key, bad); continue; }
  console.log(`  -> ${item.key} ${item.title}  ::  ${who.slice(0, 54)}`);
  const prompt = buildPrompt(item, who, SCENE[n % SCENE.length]);

  const page = await ctx.newPage();
  try {
    await page.goto("https://grok.com/imagine", { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(7000);
    const inputs = await page.$$('input[type="file"]');
    if (!inputs.length) throw new Error("no file input");
    await inputs[0].setInputFiles(art);
    await page.waitForTimeout(8500);

    const box = await page.$('div[contenteditable="true"], textarea');
    await box.click();
    await page.waitForTimeout(350);
    await page.keyboard.insertText(prompt);
    await page.waitForTimeout(800);
    await page.keyboard.press("Enter");

    let pid = null;
    for (let i = 0; i < 28; i++) {
      await page.waitForTimeout(6500);
      pid = (page.url().match(/imagine\/post\/([0-9a-f-]+)/) || [])[1];
      if (pid) break;
    }
    if (!pid) throw new Error("no post page");

    let prev = null, url = null;
    for (let i = 0; i < 14; i++) {
      await page.waitForTimeout(8500);
      url = await pickRender(page);
      if (url && url === prev) break;   // settled
      prev = url;
    }
    if (!url) throw new Error("no square render");

    const buf = await (await page.request.get(url)).body();
    if (buf.length < 180000) throw new Error(`unfinished ${Math.round(buf.length / 1024)}KB`);
    fs.writeFileSync(dest, buf);
    done++;
    console.log(`[${done}] ${item.key} ${item.title} ${Math.round(buf.length / 1024)}KB`);
  } catch (e) {
    failed.push([item.key, e.message.slice(0, 38)]);
    console.log("FAIL", item.key, e.message.slice(0, 44));
  }
  await page.close().catch(() => {});
}

console.log(`\ndone ${done} / ${queue.length}`);
if (failed.length) console.log("failed:", JSON.stringify(failed));
await browser.close();

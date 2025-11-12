const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const slugify = require("slugify");

const RAW_PATH = "./raw";
const OUTPUT_PATH = "./images";
const TARGET_WIDTH = 800; // Resize width for optimization

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function processImage(filePath, category, index) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const baseName = path.basename(filePath, ext);
  const sku = slugify(baseName, { upper: true, replacement: "", remove: /[^A-Za-z0-9]/g });
  const outDir = path.join(OUTPUT_PATH, category);
  const outputPath = path.join(outDir, `${sku}.png`);

  ensureDir(outDir);

  await sharp(filePath)
    .resize(TARGET_WIDTH)
    .png({ quality: 80 })
    .toFile(outputPath);

  console.log(`✅ ${category}: ${sku}.png created`);
}

async function processCategory(category) {
  const categoryPath = path.join(RAW_PATH, category);
  const files = fs.readdirSync(categoryPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(categoryPath, files[i]);
    await processImage(filePath, category, i);
  }
}

(async () => {
  console.log("🚀 Preparing images...");
  await processCategory("nike");
  await processCategory("airjordan");
  console.log("✨ All images processed!");
})();

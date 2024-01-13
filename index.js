const path = require("path");
const fs = require("fs");

const argv = require("minimist")(process.argv.slice(2));

let { paddingDigits, folder, outFolder, behavior, numeric } = argv;

if (!paddingDigits) paddingDigits = 0;
if (!folder) folder = process.cwd();
if (!outFolder) outFolder = process.cwd();
if (!behavior) behavior = "copy";

if (["copy", "move"].indexOf(behavior) === -1) {
  behavior = copy;
}

console.log(
  `Renaming every file in this folder, outputting them in ${outFolder} with ${paddingDigits} padding digits...`
);

if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder);

const files = fs.readdirSync(folder);

if (numeric) {
  files.sort((a, b) => {
    const aNum = parseInt(a.split(".")[0]);
    const bNum = parseInt(b.split(".")[0]);
    return aNum - bNum;
  });
}

files.forEach((file, index) => {
  const extension = path.extname(file);
  const paddedIndex = index.toString().padStart(paddingDigits, "0");
  const newFilename = `${paddedIndex}${extension}`;

  if (behavior === "copy") {
    fs.copyFileSync(path.join(folder, file), path.join(outFolder, newFilename));
    return;
  }

  fs.renameSync(path.join(folder, file), path.join(outFolder, newFilename));
});

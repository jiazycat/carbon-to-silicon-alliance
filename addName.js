// carbon-to-silicon-alliance/addName.js
const fs = require("fs");
const path = require("path");

const avatarsDir = path.join(__dirname, "avatars");
const maxPerFile = 1000;

function getAvatarFiles() {
  if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir);
  }
  return fs.readdirSync(avatarsDir)
           .filter(f => f.endsWith(".json"))
           .sort((a,b) => a.localeCompare(b));
}

function addName(name) {
  const files = getAvatarFiles();
  let targetFile = "";

  if (files.length === 0) {
    targetFile = "list-1.json";
  } else {
    const lastFile = files[files.length - 1];
    const data = JSON.parse(fs.readFileSync(path.join(avatarsDir, lastFile)));
    if (data.length < maxPerFile) {
      targetFile = lastFile;
    } else {
      const nextIndex = files.length + 1;
      targetFile = `list-${nextIndex}.json`;
    }
  }

  let list = [];
  const targetPath = path.join(avatarsDir, targetFile);
  if (fs.existsSync(targetPath)) {
    list = JSON.parse(fs.readFileSync(targetPath));
  }

  list.push(name);
  fs.writeFileSync(targetPath, JSON.stringify(list, null, 2));

  console.log(`Added "${name}" to ${targetFile} (total ${list.length} names)`);
}

const args = process.argv.slice(2);
if (!args[0]) {
  console.log("Usage: node addName.js <name>");
  process.exit(1);
}

addName(args[0]);

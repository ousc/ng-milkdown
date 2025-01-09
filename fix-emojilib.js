// fix-emojilib.js
const fs = require('fs');
const path = require('path');

const pathsToCheck = [
  path.join(__dirname, 'node_modules', 'emojilib', 'index.js'),
  path.join(__dirname, 'node_modules', 'node-emoji', 'node_modules', 'emojilib', 'index.js')
];

let foundFile = false; // 用于跟踪是否找到文件

pathsToCheck.forEach(filePath => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // 如果文件不存在，打印信息而不是报错
      if (err.code === 'ENOENT') {
        console.log(`\x1b[33m[SKIPPED]\x1b[0m File not found at ${filePath}, skipping.`);
      } else {
        console.error(`Error reading file at ${filePath}:`, err);
      }
      return;
    }

    foundFile = true; // 找到文件，设置标志

    // 替换 require 语句
    const modifiedData = data
      .replace(/require\(['"]\.\/emojis['"]\)/g, "require('./emojis.json')")
      .replace(/require\(['"]\.\/ordered['"]\)/g, "require('./ordered.json')");

    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file at ${filePath}:`, err);
        return;
      }
      console.log(`\x1b[32m[SUCCESS]\x1b[0m Modified ${filePath}`);
    });
  });
});

// 如果没有找到任何文件，可以选择打印一条信息
process.on('exit', () => {
  if (!foundFile) {
    console.log('No emojilib index.js file found to modify.');
  }
});

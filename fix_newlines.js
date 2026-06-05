const fs = require('fs');
const path = require('path');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file === 'page.tsx') {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

const baseDirs = [
  path.join(__dirname, 'src/app/solutions'),
  path.join(__dirname, 'src/app/intelligence'),
  path.join(__dirname, 'src/app/industries')
];

let files = [];
baseDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        files = files.concat(getAllFiles(dir));
    }
});

let modifiedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if the file contains the literal string \n
    if (content.includes('\\n')) {
        // Replace literal \n with an actual newline
        content = content.replace(/\\n/g, '\n');
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log(`Fixed: ${file}`);
    }
}

console.log(`\\nSuccessfully fixed ${modifiedCount} files.`);

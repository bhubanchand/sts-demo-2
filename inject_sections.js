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

const importStatements = `
import { TestimonialsCarousel } from "@/components/ui/testimonials-carousel";
import { IntegrationsGrid } from "@/components/ui/integrations-grid";
import { StatsBanner } from "@/components/ui/stats-banner";
`;

const componentsToInject = `
      <StatsBanner />
      <IntegrationsGrid />
      <TestimonialsCarousel />
`;

let modifiedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. Center Align Headings
    if (content.includes('className="max-w-4xl"')) {
        content = content.replace('className="max-w-4xl"', 'className="max-w-4xl mx-auto text-center"');
        changed = true;
    }
    
    // Check for the [1400px] variant that doesn't have text-center
    // But many might actually have text-center on a child div. Let's just make sure the main wrapper has text-center
    if (content.includes('className="max-w-[1400px] mx-auto text-center"')) {
        // Already centered, good
    } else if (content.includes('className="max-w-[1400px] mx-auto"')) {
        // It's not centered but has max-w, let's just make sure we don't double replace
        // Actually, in the files I generated, I used `className="max-w-[1400px] mx-auto text-center"` so they are already centered.
    }

    // 2. Add Imports (only if not already there)
    if (!content.includes('TestimonialsCarousel')) {
        const lastImportIndex = content.lastIndexOf('import ');
        if (lastImportIndex !== -1) {
            const endOfLastImport = content.indexOf('\\n', lastImportIndex);
            content = content.slice(0, endOfLastImport + 1) + importStatements.trim() + '\\n' + content.slice(endOfLastImport + 1);
            changed = true;
        } else {
            content = importStatements.trim() + '\\n\\n' + content;
            changed = true;
        }
    }

    // 3. Inject Components before TrustBadges or CTASection
    if (!content.includes('<StatsBanner />')) {
        if (content.includes('<TrustBadges />')) {
            content = content.replace('<TrustBadges />', componentsToInject.trim() + '\\n      <TrustBadges />');
            changed = true;
        } else if (content.includes('<CTASection />')) {
            content = content.replace('<CTASection />', componentsToInject.trim() + '\\n      <CTASection />');
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log(`Modified: ${file}`);
    }
}

console.log(`\\nSuccessfully modified ${modifiedCount} files.`);

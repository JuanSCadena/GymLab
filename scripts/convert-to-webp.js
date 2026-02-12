const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images/sequence3');
const outputDir = path.join(__dirname, '../public/images/sequence3/webp');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file).toLowerCase() === '.png') {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, path.basename(file, '.png') + '.webp');

            sharp(inputPath)
                .webp({ quality: 80, effort: 6 }) // High quality, slow compression for best size
                .toFile(outputPath)
                .then(info => console.log(`Converted ${file}: ${info.size} bytes`))
                .catch(err => console.error(`Error converting ${file}:`, err));
        }
    });
});

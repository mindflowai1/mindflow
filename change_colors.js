const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, 'src', 'LandingPage.jsx'),
    path.join(__dirname, 'src', 'LiquidSphere3D.jsx')
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Primary Neon Color
        content = content.replace(/#0cf2cd/gi, '#00B4E5');
        // rgba equivalent of #0cf2cd (12,242,205) -> (0,180,229)
        content = content.replace(/12\s*,\s*242\s*,\s*205/g, '0,180,229');

        // Lighter Neon Color
        content = content.replace(/#1fffd9/gi, '#33C6EA');

        // Darker Background/Shadow Tint
        content = content.replace(/#033a2d/gi, '#003A53');
        // rgba equivalent of #033a2d (3,58,45) -> (0,58,83)
        content = content.replace(/3\s*,\s*58\s*,\s*45/g, '0,58,83');

        // Very Dark Core Tint
        content = content.replace(/#01120f/gi, '#001119');
        content = content.replace(/#012b24/gi, '#002233');

        fs.writeFileSync(file, content);
        console.log(`Updated colors in: ${file}`);
    }
});


// generateThemes.js
const fs = require('fs');
const path = require('path');
const themeValtoKey = require('./availableThemes.json')



// Simulate the require.context function for Node.js
function requireContext(directory, useSubdirectories, regExp) {
  const keys = fs.readdirSync(directory).filter(file => regExp.test(file));
  const context = (key) => {
    const filePath = path.join(directory, key);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  };
  context.keys = () => keys;
  return context;
}

// Define the themes directory
const themesDir = path.join(__dirname, '../themes');
const requireContextFunction = requireContext(themesDir, false, /\.json$/);
const themes = {};

requireContextFunction.keys().forEach((filename) => {
  const themeName = filename.replace('.json', '');
  const themeKey = themeValtoKey[themeName]
  themes[themeKey] = requireContextFunction(filename);
});

// Write the themes object to a JSON file
const outputFilePath = path.join(__dirname, './allThemes.json');
fs.writeFileSync(outputFilePath, JSON.stringify(themes, null, 2), 'utf8');

console.log('All themes have been written to allThemes.json');

const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', '.env');
const destination = path.join(process.cwd(), '.env');

if (!fs.existsSync(destination)) {
  fs.copyFileSync(source, destination);
  console.log('.env file copied to project root.');
} else {
  console.log('.env file already exists in project root. Skipping copy.');
}
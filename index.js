import { writeFile } from 'fs';
import xray from 'x-ray';

const url = process.argv[2];

if (!url) {
  console.error('Usage: node index.js <URL>');
  process.exit(1);
}

const x = xray();

x(url, ['a@href'])(function(err, links) {
  if (err) {
    console.error('Error:', err);
    return;
  }

  const output = { links };

  writeFile('output.json', JSON.stringify(output, null, 2), function(err) {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Links extracted and saved to output.json');
    }
  });
});

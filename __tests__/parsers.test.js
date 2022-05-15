import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('parse', () => {
  const fileJson = getFixturePath('file1.json');
  const dataOfJson = JSON.parse(readFileSync(fileJson));
  const format1 = path.extname(path.basename(fileJson));
  const fileYml = getFixturePath('filepath1.yml');
  const dataOfYml = yaml.load(readFileSync(fileYml));
  const format2 = path.extname(path.basename(fileYml));
  expect(parse(readFileSync(fileJson), format1)).toEqual(dataOfJson);
  expect(parse(readFileSync(fileYml), format2)).toEqual(dataOfYml);
  expect(parse('file.html')).toBeNull();
});

import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff', () => {
  const file1json = getFixturePath('file1.json');
  const file2json = getFixturePath('file2.json');
  const file1yml = getFixturePath('filepath1.yml');
  const file2yml = getFixturePath('filepath2.yml');
  const resultOfDiff = readFileSync(getFixturePath('resultOfDiff.txt'), 'utf8');
  expect(genDiff(file1yml, file2yml)).toEqual(resultOfDiff);
  expect(genDiff(file1json, file2json)).toEqual(resultOfDiff);
});

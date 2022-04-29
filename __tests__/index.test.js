import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);



test('genDiff', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const resultOfDiff = readFileSync(getFixturePath('resultOfDiff.txt'), 'utf8');
  expect(genDiff(file1, file2)).toEqual(resultOfDiff);
});

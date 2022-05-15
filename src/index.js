import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';

const genDiff = (filename1, filename2) => {
  const filepath1 = path.resolve(process.cwd(), filename1);
  const filepath2 = path.resolve(process.cwd(), filename2);
  const file1 = readFileSync(filepath1);
  const file2 = readFileSync(filepath2);
  const format1 = path.extname(path.basename(filepath1));
  const format2 = path.extname(path.basename(filepath2));
  const data1 = parse(file1, format1);
  const data2 = parse(file2, format2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqKeys = _.sortBy(_.union([...keys1, ...keys2]));
  const result = uniqKeys.map((key) => {
    if (!_.has(data1, key)) {
      return (`  + ${key}: ${data2[key]}`);
    }
    if (!_.has(data2, key)) {
      return (`  - ${key}: ${data1[key]}`);
    }
    if (data1[key] !== data2[key]) {
      return (`  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`);
    }
    return (`    ${key}: ${data1[key]}`);
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;

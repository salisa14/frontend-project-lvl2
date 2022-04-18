import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const file1 = path.resolve(process.cwd(), filepath1);
  const file2 = path.resolve(process.cwd(), filepath2);
  const data1 = JSON.parse(readFileSync(file1));
  const data2 = JSON.parse(readFileSync(file2));
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

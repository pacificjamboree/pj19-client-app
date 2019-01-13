import XLSX from 'xlsx';
import { patrolFieldMap } from '../lib/excelFileFieldMaps';
import renameKeys from '../lib/renameKeys';

export default data => {
  // we assume that the first sheet is the one we want
  const sheet = data.Sheets[data.SheetNames[0]];

  if (!sheet) {
    throw new Error(`Could not find sheet in file ${data.name}`);
  }

  let [rangeStart, rangeEnd] = sheet['!ref'].split(':');

  const dataObject = XLSX.utils.sheet_to_json(sheet, {
    range: `${rangeStart}:${rangeEnd}`,
  });

  return dataObject.map(row => ({
    ...renameKeys(patrolFieldMap, row),
  }));
};

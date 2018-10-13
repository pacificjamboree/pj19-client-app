import XLSX from 'xlsx';

import { oosFieldMap } from '../lib/excelFileFieldMaps';
import renameKeys from '../lib/renameKeys';

const DEFAULT_SHEET_NAME = 'Adventure (Program)';
const HEADER_ROW_HINT_FIELD = 'OOS Number';
const EOF_HINT_FIELD = 'Grand Total';

export default data => {
  const sheet = data.Sheets[DEFAULT_SHEET_NAME];

  if (!sheet) {
    throw new Error(
      `Could not find sheet named ${DEFAULT_SHEET_NAME} in file ${data.name}`
    );
  }

  let [rangeStart, rangeEnd] = sheet['!ref'].split(':');
  for (const key in sheet) {
    if (sheet.hasOwnProperty(key)) {
      if (sheet[key].v === HEADER_ROW_HINT_FIELD) {
        rangeStart = key;
      }
      if (sheet[key].v === EOF_HINT_FIELD) {
        const row = parseInt(key.slice(1)) - 1;
        const col = rangeEnd.match(/[\D]+/)[0];
        rangeEnd = `${col}${row.toString()}`;
      }
    }
  }

  const dataObject = XLSX.utils.sheet_to_json(sheet, {
    range: `${rangeStart}:${rangeEnd}`,
  });

  return dataObject.map(row => renameKeys(oosFieldMap, row));
};

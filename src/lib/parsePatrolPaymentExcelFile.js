import XLSX from 'xlsx';

import { paymentFieldMap } from '../lib/excelFileFieldMaps';
import renameKeys from '../lib/renameKeys';

export default data => {
  console.log(data.Sheets);
  const sheet = data.Sheets['Payment Tracking'];

  if (!sheet) {
    throw new Error(`Could not find sheet in file ${data.name}`);
  }

  let [rangeStart, rangeEnd] = sheet['!ref'].split(':');

  const dataObject = XLSX.utils.sheet_to_json(sheet, {
    range: `${rangeStart}:${rangeEnd}`,
  });

  return dataObject
    .map(row => ({
      ...renameKeys(paymentFieldMap, row),
    }))
    .filter(r => r.hasOwnProperty('finalPaymentDate'))
    .map(r => ({
      ...r,
      patrolNumber: r.patrolNumber.replace(/^\w-/, ''),
    }));
};

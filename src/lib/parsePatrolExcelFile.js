import XLSX from 'xlsx';

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

  const ALLOWED_KEYS = [
    'patrolNumber',
    'groupName',
    'patrolName',
    'subcamp',
    'email',
    'numberOfScouts',
    'numberOfScouters',
    'importId',
  ];

  return dataObject.map(r => {
    const filtered = Object.keys(r)
      .filter(key => ALLOWED_KEYS.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: r[key],
        };
      }, {});

    return {
      ...filtered,
      patrolNumber: r.patrolNumber.replace(/^\w-/, ''),
    };
  });
};

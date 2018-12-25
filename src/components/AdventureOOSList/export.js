import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import XLSX from 'xlsx';
import download from 'js-file-download';
import slugify from 'slugify';
import formatDate from 'date-fns/format';

const createWorkbook = ({ adventureName, data }) => {
  const header = [
    'OOS Number',
    'First Name',
    'Preferred Name',
    'Last Name',
    'Is Youth Member',
    'Email Address',
    'Parent Email',
    'Phone 1',
    'Phone 2',
    'Pre-recruited',
    'Pre-recruited By',
    'Previous Experience',
    'Special Skills',
    'Additional Information',
  ];
  const exportArrays = data.map(x => [
    x.oosNumber,
    x.firstName,
    x.preferredName,
    x.lastName,
    x.isYouth,
    x.email,
    x.parentEmail,
    x.phone1,
    x.phone2,
    x.prerecruited,
    x.prerecruitedBy,
    x.previousExperience,
    x.specialSkills,
    x.additionalInformation,
  ]);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([header, ...exportArrays]);

  XLSX.utils.book_append_sheet(workbook, worksheet, `${adventureName} OOS`);

  return { workbook, worksheet };
};

const exportExcel = ({ adventureName, data }) => {
  const filename = slugify(
    `oos-${adventureName}-${formatDate(new Date(), 'YYYY-MM-DD-HHmmss')}.xlsx`
  ).toLowerCase();
  const { workbook } = createWorkbook({ adventureName, data });
  XLSX.writeFile(workbook, filename);
};

const exportCSV = ({ adventureName, data }) => {
  const filename = slugify(
    `oos-${adventureName}-${formatDate(new Date(), 'YYYY-MM-DD-HHmmss')}.csv`
  ).toLowerCase();
  const { worksheet } = createWorkbook({ adventureName, data });
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  download(csv, filename, 'text/plain');
};

const ExportOOS = ({ adventureName, data }) => (
  <Dropdown
    text="Download OOS List"
    icon="file"
    floating
    labeled
    button
    disabled={!data.length}
    className="icon"
  >
    <Dropdown.Menu>
      <Dropdown.Item
        icon="file excel"
        text="Excel"
        onClick={() => {
          exportExcel({ adventureName, data });
        }}
      />
      <Dropdown.Item
        icon="file text"
        text="CSV"
        onClick={() => {
          exportCSV({ adventureName, data });
        }}
      />
    </Dropdown.Menu>
  </Dropdown>
);

export default ExportOOS;

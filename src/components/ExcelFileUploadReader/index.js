import React, { Component } from 'react';
import XLSX from 'xlsx';
import { Icon } from 'semantic-ui-react';
import styles from './styles.module.css';

const XLSX_MIME_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

class ExcelFileUploadReader extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      hovering: false,
    };
  }

  static readUploadedFileAsBinary = inputFile => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsBinaryString(inputFile);
    });
  };

  handleChange(e) {
    const file = e.target.files[0];
    this.processFile(file);
  }

  async processFile(file) {
    if (file.type !== XLSX_MIME_TYPE) {
      this.props.onError(new Error(`${file.name} is not a valid .xlsx file`));
      return;
    }

    const fileContent = await ExcelFileUploadReader.readUploadedFileAsBinary(
      file
    );
    const workbook = XLSX.read(fileContent, { type: 'binary' });
    this.props.onReadFile(workbook);
  }

  render() {
    return (
      <>
        <div
          className={
            this.state.hovering ? styles.dropzoneHover : styles.dropzone
          }
          onDragOver={e => {
            e.preventDefault();
          }}
          onDragEnter={e => {
            e.preventDefault();
            this.setState({ hovering: true });
          }}
          onDragLeave={e => {
            e.preventDefault();
            this.setState({ hovering: false });
          }}
          onDrop={e => {
            e.preventDefault();
            this.processFile(e.dataTransfer.files[0]);
          }}
        >
          <p>
            <Icon className={styles.icon} name="file excel" size="huge" />
          </p>

          <p>
            Drag Excel File Here or{' '}
            <span
              onClick={e =>
                document.querySelector('input[type="file"]').click()
              }
              className={styles.fakelink}
            >
              Click to Upload
            </span>
          </p>
        </div>
        <div className={styles.form}>
          <label htmlFor="fileinput">Choose Excel File</label>
          <input
            type="file"
            name="fileinput"
            accept={`.xlsx,${XLSX_MIME_TYPE}`}
            onChange={this.handleChange}
          />
        </div>
      </>
    );
  }
}

export default ExcelFileUploadReader;

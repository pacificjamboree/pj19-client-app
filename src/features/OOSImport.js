import React, { Component } from 'react';
import { Icon, Header, Segment, Step } from 'semantic-ui-react';
import ExcelFileUploadReader from '../components/ExcelFileUploadReader';
import OOSImporter from '../components/OOSImporter';
import OOSImportReview from '../components/OOSImportReview';
import parseOOSExcelFile from '../lib/parseOOSExcelFile';

const importId = () => btoa(`OOSImport:::${Date.now()}`);

class OOSImport extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      importId: importId(),
      fileParsed: false,
      errors: [],
      importData: [],
    };
    this.onReadFile = this.onReadFile.bind(this);
    this.onError = this.onError.bind(this);
    this.onHandleImportDataChange = this.onHandleImportDataChange.bind(this);
    this.stepUpdater = this.stepUpdater.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onReadFile(data) {
    try {
      const sanitizedData = parseOOSExcelFile(data);
      this.setState({
        error: null,
        importData: sanitizedData,

        fileParsed: true,
        step: 2,
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  onError(error) {
    this.setState({ error });
  }

  onHandleImportDataChange(oos) {
    const importData = this.state.importData.map(
      i => (i.oosNumber === oos.oosNumber ? oos : i)
    );
    this.setState({
      importData,
    });
  }

  stepUpdater(step) {
    this.setState({ step });
  }

  resetState() {
    this.setState({
      ...this.state,
      importData: [],
      step: 1,
      importId: importId(),
    });
  }

  stepRenderer(step) {
    switch (step) {
      case 1:
        return (
          <ExcelFileUploadReader
            onError={this.onError}
            onReadFile={this.onReadFile}
          />
        );
      case 2:
        return (
          <OOSImporter
            importData={this.state.importData}
            importId={this.state.importId}
            changeHandler={this.onHandleImportDataChange}
            stepUpdater={this.stepUpdater}
            resetState={this.resetState}
          />
        );

      case 3:
        return <OOSImportReview importId={this.state.importId} />;
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <Header as="h1">Import OOS</Header>
        {this.state.error && (
          <Segment inverted color="red">
            <p>{this.state.error.message}</p>
          </Segment>
        )}

        <Step.Group widths={3}>
          <Step active={this.state.step === 1}>
            <Icon name="file excel" />
            <Step.Content>Upload OOS Excel File</Step.Content>
          </Step>
          <Step active={this.state.step === 2}>
            <Icon name="edit" />
            <Step.Content>Prepare OOS for Import</Step.Content>
          </Step>
          <Step active={this.state.step === 3}>
            <Icon name="mail" />
            <Step.Content>Review Import and Send Emails</Step.Content>
          </Step>
        </Step.Group>

        {this.stepRenderer(this.state.step)}
      </>
    );
  }
}

export default OOSImport;

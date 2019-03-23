import React, { Component } from 'react';
import { Icon, Header, Segment, Step } from 'semantic-ui-react';
import { Link } from '@reach/router';
import ExcelFileUploadReader from '../../components/ExcelFileUploadReader';
import PatrolImporter from '../../components/PatrolImporter';
import parsePatrolExcelFile from '../../lib/parsePatrolExcelFile';
import { utoa } from '../../lib/base64';

const importId = () => utoa(`PatrolImport:::${Date.now()}`);

class PatrolImport extends Component {
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
      const sanitizedData = parsePatrolExcelFile(data);
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
    const importData = this.state.importData.map(i =>
      i.oosNumber === oos.oosNumber ? oos : i
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
          <PatrolImporter
            importData={this.state.importData}
            importId={this.state.importId}
            changeHandler={this.onHandleImportDataChange}
            stepUpdater={this.stepUpdater}
            resetState={this.resetState}
          />
        );

      case 3:
        return (
          <>
            <Header as="h2">Import Complete</Header>
            <p>
              Patrol import is complete.{' '}
              <Link to="..">Go to Patrol listing</Link>
            </p>
          </>
        );
      default:
        break;
    }
  }

  render() {
    return (
      <>
        <Header as="h1">Import Patrols</Header>
        {this.state.error && (
          <Segment inverted color="red">
            <p>{this.state.error.message}</p>
          </Segment>
        )}

        <Step.Group widths={4}>
          <Step active={this.state.step === 1}>
            <Icon name="file excel" />
            <Step.Content>Upload Patrol Excel File</Step.Content>
          </Step>
          <Step active={this.state.step === 2}>
            <Icon name="edit" />
            <Step.Content>Prepare Patrols and Import</Step.Content>
          </Step>
          <Step active={this.state.step === 3}>
            <Icon name="check circle" />
            <Step.Content>Done</Step.Content>
          </Step>
        </Step.Group>

        {this.stepRenderer(this.state.step)}
      </>
    );
  }
}

export default PatrolImport;

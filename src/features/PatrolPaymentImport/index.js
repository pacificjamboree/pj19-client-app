import React, { Component } from 'react';
import { Icon, Header, Segment, Step } from 'semantic-ui-react';
import { Link } from '@reach/router';
import ExcelFileUploadReader from '../../components/ExcelFileUploadReader';
import PatrolPaymentImporter from '../../components/PatrolPaymentImporter';
import parsePatrolPaymentExcelFile from '../../lib/parsePatrolPaymentExcelFile';

class PatrolPaymentImport extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      fileParsed: false,
      errors: [],
      importData: [],
    };
    this.onReadFile = this.onReadFile.bind(this);
    this.onError = this.onError.bind(this);
    this.stepUpdater = this.stepUpdater.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onReadFile(data) {
    try {
      const sanitizedData = parsePatrolPaymentExcelFile(data);
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

  stepUpdater(step) {
    this.setState({ step });
  }

  resetState() {
    this.setState({
      ...this.state,
      importData: [],
      step: 1,
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
          <PatrolPaymentImporter
            importData={this.state.importData}
            stepUpdater={this.stepUpdater}
          />
        );

      case 3:
        return (
          <>
            <Header as="h2">Import Complete</Header>
            <p>Patrol payment import is complete.</p>
            <p>
              <Link to="/dashboard/patrols">Go to Patrol listing</Link>
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
        <Header as="h1">Import Patrol Payment File</Header>
        {this.state.error && (
          <Segment inverted color="red">
            <p>{this.state.error.message}</p>
          </Segment>
        )}

        <Step.Group widths={4}>
          <Step active={this.state.step === 1}>
            <Icon name="file excel" />
            <Step.Content>Upload Patrol Payment Excel File</Step.Content>
          </Step>
          <Step active={this.state.step === 2}>
            <Icon name="edit" />
            <Step.Content>Review Data and Import</Step.Content>
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

export default PatrolPaymentImport;

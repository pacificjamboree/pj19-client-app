import React, { Component } from 'react';
import { Icon, Header, Segment, Step } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import ExcelFileUploadReader from '../components/ExcelFileUploadReader';
import OOSImporter from '../components/OOSImporter';
import parseOOSExcelFile from '../lib/parseOOSExcelFile';
import { BATCH_IMPORT_OOS_MUTATION } from '../graphql/queries';
import { OFFERS_OF_SERVICE_FRAGMENT } from '../graphql/fragments';

const refetchQuery = gql`
  query {
    offersOfService: offersOfService {
      ...OffersOfServiceFragment
    }
  }
  ${OFFERS_OF_SERVICE_FRAGMENT}
`;

class OOSImport extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      importId: btoa(`OOSImport:::${Date.now()}`),
      fileParsed: false,
      errors: [],
      importData: [],
      importCount: 0,
    };
    this.onReadFile = this.onReadFile.bind(this);
    this.onError = this.onError.bind(this);
    this.onHandleImportDataChange = this.onHandleImportDataChange.bind(this);
  }

  onReadFile(data) {
    try {
      const sanitizedData = parseOOSExcelFile(data);
      this.setState({
        error: null,
        importData: sanitizedData,
        importCount: sanitizedData.filter(x => x.importOOS === true).length,
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
      importCount: importData.filter(x => x.importOOS === true).length,
    });
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

        {this.state.fileParsed && this.state.importData ? (
          <Mutation
            mutation={BATCH_IMPORT_OOS_MUTATION}
            onCompleted={data => console.log({ data })}
            update={(cache, mutationResult) => console.log({ mutationResult })}
            refetchQueries={[{ query: refetchQuery }]}
          >
            {(mutationFn, { data, error }) => {
              return (
                <OOSImporter
                  importData={this.state.importData}
                  importCount={this.state.importCount}
                  changeHandler={this.onHandleImportDataChange}
                  mutation={mutationFn}
                />
              );
            }}
          </Mutation>
        ) : (
          <ExcelFileUploadReader
            onError={this.onError}
            onReadFile={this.onReadFile}
          />
        )}
      </>
    );
  }
}

export default OOSImport;

import React, { Component } from 'react';
import { Header, Segment } from 'semantic-ui-react';
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
        {this.state.fileParsed && this.state.importData ? (
          <Mutation
            mutation={BATCH_IMPORT_OOS_MUTATION}
            onCompleted={data => console.log({ data })}
            update={(cache, mutationResult) => console.log({ mutationResult })}
            refetchQueries={[{ query: refetchQuery }]}
          >
            {(mutationFn, { data, error }) => {
              console.log({ data, error });
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

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Grid, Header, Loader, Table } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import slugify from 'slugify';

const QUERY = gql`
  query {
    textContent(search: { searchField: title, value: "adventure-guide" }) {
      body
      toc
      updatedAt
    }
  }
`;

function flatten(text, child) {
  // https://github.com/rexxars/react-markdown/issues/69
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

const AdventureGuide = () => (
  <Query query={QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <Loader active />;
      if (error) return <p>Error</p>;

      const SemanticHeader = ({ level, children }) => {
        const text = children.reduce(flatten, '');
        return (
          <Header id={slugify(text).toLowerCase()} as={`h${level}`}>
            {text}
          </Header>
        );
      };

      const SemanticTable = ({ children }) => (
        <Table celled striped>
          {children}
        </Table>
      );

      const TableCell = ({ isHeader, align, children }) => {
        switch (isHeader) {
          case true:
            return <Table.HeaderCell>{children}</Table.HeaderCell>;

          default:
            return <Table.Cell>{children}</Table.Cell>;
        }
      };

      const TableRow = ({ children }) => <Table.Row>{children}</Table.Row>;

      const TableHeader = ({ children }) => (
        <Table.Header>{children}</Table.Header>
      );

      const TableBody = ({ children }) => <Table.Body>{children}</Table.Body>;

      return (
        <>
          <Grid>
            <Grid.Row>
              <Grid.Column width={4}>
                <span>Table of Contents</span>
                <ReactMarkdown source={data.textContent.toc} />
              </Grid.Column>
              <Grid.Column width={12}>
                <ReactMarkdown
                  source={data.textContent.body}
                  renderers={{
                    heading: SemanticHeader,
                    table: SemanticTable,
                    tableHead: TableHeader,
                    tableBody: TableBody,
                    tableRow: TableRow,
                    tableCell: TableCell,
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      );
    }}
  </Query>
);

export default AdventureGuide;

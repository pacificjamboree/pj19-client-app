import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Grid, Header, Loader, Table } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import slugify from 'slugify';

import styles from './style.module.css';

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

// const AdventureGuide = () => (
class AdventureGuide extends Component {
  state = {};

  handleContextRef = contextRef => this.setState({ contextRef });

  render() {
    const { contextRef } = this.state;
    console.log(contextRef);
    return (
      <Query query={QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <Loader active />;
          if (error) return <p>Error</p>;

          const SemanticHeader = ({ level, children }) => {
            if (level === 1) return null;
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

          const TableBody = ({ children }) => (
            <Table.Body>{children}</Table.Body>
          );

          return (
            <div id="context" ref={this.handleContextRef}>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Header as="h1">
                      Pacific Jamboree 2019 Adventure Guide
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <span className={styles.tocHeader}>Table of Contents</span>
                    <ReactMarkdown
                      source={data.textContent.toc}
                      className={styles.toc}
                    />
                  </Grid.Column>
                  <Grid.Column width={8}>
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
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AdventureGuide;

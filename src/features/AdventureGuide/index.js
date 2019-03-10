import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown/with-html';
import { Grid, Header, Loader, Table } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import slugify from 'slugify';
import formatDate from 'date-fns/format';
import AdventureListItem from '../../components/AdventureListItem';

import styles from './style.module.css';

const QUERY = gql`
  query {
    adventures(filters: { workflowState: active }) {
      adventureCode
      id
      _id
      name
      themeName
      fullName
      description
      fee
      premiumAdventure
      periodsRequired
      location
      capacityPerPeriod
      hidden
    }
    textContent(search: { searchField: title, value: "adventure-guide" }) {
      body
      toc
      updatedAt
    }
  }
`;

const sortByName = (a, b) => {
  if (a.fullName < b.fullName) return -1;
  if (a.fullName > b.fullName) return 1;
  return 0;
};

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

      const GROUP_A = data.adventures
        .filter(a => a.premiumAdventure)
        .sort(sortByName)
        .map(a =>
          renderToStaticMarkup(
            <AdventureListItem
              adventure={a}
              showLocation={true}
              showCapacity={false}
            />
          )
        )
        .join('\n\n');

      const GROUP_B = data.adventures
        .filter(a => !a.premiumAdventure && a.fee === 0)
        .sort(sortByName)
        .map(a =>
          renderToStaticMarkup(
            <AdventureListItem
              adventure={a}
              showLocation={true}
              showCapacity={false}
            />
          )
        )
        .join('\n\n');

      const GROUP_C = data.adventures
        .filter(a => !a.premiumAdventure && a.fee)
        .sort(sortByName)
        .map(a =>
          renderToStaticMarkup(
            <AdventureListItem
              adventure={a}
              showLocation={true}
              showCapacity={false}
            />
          )
        )
        .join('\n\n');

      const guide = data.textContent.body
        .replace(':::GROUP_A:::', GROUP_A)
        .replace(':::GROUP_B:::', GROUP_B)
        .replace(':::GROUP_C:::', GROUP_C);

      return (
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h1">Pacific Jamboree 2019 Adventure Guide</Header>
              <span className={styles.lastUpdated}>
                Last Updated{' '}
                {formatDate(data.textContent.updatedAt, 'MMMM D, YYYY')}
              </span>
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
                escapeHtml={false}
                source={guide}
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
      );
    }}
  </Query>
);

const SemanticHeader = ({ level, children }) => {
  if (level === 1) return null;
  const text = children.reduce(flatten, '');
  return (
    <Header
      className={styles.suiHeader}
      id={slugify(text).toLowerCase()}
      as={`h${level}`}
    >
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

const TableHeader = ({ children }) => <Table.Header>{children}</Table.Header>;

const TableBody = ({ children }) => <Table.Body>{children}</Table.Body>;

export default AdventureGuide;

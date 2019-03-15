import React from 'react';
import { Header } from 'semantic-ui-react';
import gql from 'graphql-tag';
import TextContentEdit from '../../components/TextContentEdit';
import DocumentTitle from '../../components/DocumentTitle';

const UPDATE_ADVENTURE_GUIDE = gql`
  mutation updateAdventureGuide($body: String!) {
    updateAdventureGuide(
      input: { title: "adventure-guide", TextContent: { body: $body } }
    ) {
      TextContent {
        id
        title
        body
        updatedAt
      }
    }
  }
`;

const AdventureGuideEdit = () => (
  <DocumentTitle title="Edit Adventure Guide">
    <>
      <Header as="h1">Edit Adventure Guide</Header>
      <TextContentEdit
        title="adventure-guide"
        mutation={UPDATE_ADVENTURE_GUIDE}
      />
    </>
  </DocumentTitle>
);

export default AdventureGuideEdit;

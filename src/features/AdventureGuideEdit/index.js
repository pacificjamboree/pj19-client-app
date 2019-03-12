import React from 'react';
import TextContentEdit from '../../components/TextContentEdit';
import { Header } from 'semantic-ui-react';
import gql from 'graphql-tag';

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
  <>
    <Header as="h1">Edit Adventure Guide</Header>
    <TextContentEdit
      title="adventure-guide"
      mutation={UPDATE_ADVENTURE_GUIDE}
    />
  </>
);

export default AdventureGuideEdit;

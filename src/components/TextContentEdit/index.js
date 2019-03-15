import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Query, Mutation, withApollo } from 'react-apollo';
import { Button, Form, Icon, Loader, Tab, TextArea } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import gql from 'graphql-tag';

import { pushFlashMessage } from '../../lib/flashMessage';

const GET_TEXT_CONTENT = gql`
  query getTextContent($title: String!) {
    textContent(search: { searchField: title, value: $title }) {
      id
      _id
      title
      body
    }
  }
`;

class EditForm extends Component {
  constructor(props) {
    super(props);
    const { textContent } = props;
    this.state = {
      body: textContent.body,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { value }) {
    this.setState({ body: value });
  }

  render() {
    const { client, mutation } = this.props;
    const { body } = this.state;
    const panes = [
      {
        menuItem: 'Edit',
        render: () => (
          <Tab.Pane>
            <Form>
              <TextArea
                style={{ height: 400 }}
                onChange={this.handleChange}
                value={body}
              />
            </Form>
            <Mutation
              mutation={mutation}
              variables={{ body }}
              update={() => {
                pushFlashMessage(client, {
                  kind: 'success',
                  message: 'Document saved',
                });
              }}
              onError={error => {
                console.error(error);
                pushFlashMessage(client, {
                  kind: 'error',
                  message: 'An error occurred while saving the document',
                  error: error.message,
                });
              }}
            >
              {(mutation, { data, error }) => (
                <Button
                  style={{ marginTop: '1.5em' }}
                  onClick={mutation}
                  color="teal"
                  icon
                  labelPosition="left"
                >
                  <Icon name="check" />
                  Save
                </Button>
              )}
            </Mutation>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Preview',
        render: () => (
          <Tab.Pane>
            <ReactMarkdown source={body} />
          </Tab.Pane>
        ),
      },
    ];

    return <Tab panes={panes} />;
  }
}

const EditFormWithApollo = withApollo(EditForm);

const TextContentEdit = ({ title, mutation }) => (
  <Query query={GET_TEXT_CONTENT} variables={{ title }}>
    {({ data, loading, error }) => {
      if (loading) return <Loader active />;
      if (error) return <p>Error</p>;

      const { textContent } = data;
      return (
        <EditFormWithApollo mutation={mutation} textContent={textContent} />
      );
    }}
  </Query>
);

TextContentEdit.propTypes = {
  title: propTypes.string.isRequired,
};

export default TextContentEdit;

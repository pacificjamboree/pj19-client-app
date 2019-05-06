import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'semantic-ui-react';

const CopyEmailAddressesModal = ({ trigger, description, emailAddresses }) => (
  <Modal trigger={trigger} centered={false} closeIcon>
    <Modal.Header>Copy Email Addresses</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <p>{description}</p>
        <Form>
          <Form.TextArea rows={20} value={emailAddresses} />
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

CopyEmailAddressesModal.propTypes = {
  trigger: PropTypes.element.isRequired,
  description: PropTypes.string.isRequired,
  emailAddresses: PropTypes.string.isRequired,
};

export default CopyEmailAddressesModal;

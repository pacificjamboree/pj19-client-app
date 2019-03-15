import React from 'react';
import ReactDocumentTitle from 'react-document-title';

const DocumentTitle = ({ title, children }) => (
  <ReactDocumentTitle title={`${title} - PJ 2019 Adventure`}>
    {children}
  </ReactDocumentTitle>
);

export default DocumentTitle;

import React, { Fragment } from 'react';
export default str =>
  str.split('\n').map((item, key) => (
    <Fragment key={key}>
      {item}
      <br />
    </Fragment>
  ));

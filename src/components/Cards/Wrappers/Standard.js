import React from 'react';

export default class StandardWrapper extends React.Component {
  constructor() {
    super();
  }

  render() {

    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    )
  }
}


import React from 'react';

export default class AlertWrapper extends React.Component {
  constructor() {
    super();
  }

  render() {

    const { children } = this.props;

    return (
      <div className='shake-constant shake-slow'>
        {children}
      </div>
    )
  }
}


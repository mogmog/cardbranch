import React from 'react';
import ReactCardFlip from 'react-card-flip';

export default class Flip extends React.Component {
  constructor() {
    super();

    this.state = {
      isFlipped: false
    };

  }

  render() {

    const {children} = this.props;

    return (
      <div>

        <ReactCardFlip isFlipped={this.state.isFlipped}>

          <div key="front">
            {children}
            <a onClick={(e) => {this.setState({'isFlipped' : !this.state.isFlipped})}}>See more</a>
          </div>

          <div key="back">
            I am the back
          </div>


        </ReactCardFlip>

      </div>
    )
  }
}


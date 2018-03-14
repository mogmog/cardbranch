import React, {Component} from 'react';
import { Motion, spring } from 'react-motion';

export default class extends Component {
  render() {

    const {children, _key, currentItem} = this.props;

    return (
      <Motion key={_key} style={{height: spring(currentItem ? 350 : 60) }}>
        {
          ({height}) => (
            <div style={{'height': `${height}px` }}>
              {children}
            </div>
          )}
      </Motion>

    );
  }
}

import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import styles from './LucaSidebar.less';

export default class extends Component {

  constructor(props) {
    super();
  }

  componentWillMount () {

  }

  render() {

    const { children, open } = this.props;

    return (

      <div>

        <Motion style={{tween: spring(open ? 0 : 100)}}>
          {
            ({tween}) => (

              <div className={styles.sidebar} style={{'transform': `translateX(${tween}%)` }}>
                {children}
              </div>
            )}
        </Motion>

      </div>
    );
  }

}


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

    const { children, right=true, open, width } = this.props;

    return (

      <div>

        <Motion style={{tween: spring(open ? width : 0)}}>
          {
            ({tween}) => (

              <div className={`${styles.sidebar} ${(right) ? styles.right : styles.left}`} style={{'width': `${tween}%` }}>
                {children}
              </div>
            )}
        </Motion>

      </div>
    );
  }

}


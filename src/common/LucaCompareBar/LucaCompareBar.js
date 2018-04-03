import React, {Component} from 'react';
import {Motion, spring} from 'react-motion';
import styles from './LucaCompareBar.less';
import CardLoader from '../../components/Cards/CardLoader';

export default class extends Component {

  constructor(props) {
    super();
  }

  componentWillMount() {

  }

  render() {

    const {compareLeft, open, height = 50} = this.props;

    return (

      <div>

        <Motion style={{tween: spring(open ? height : 0)}}>
          {
            ({tween}) => (

              <div className={`${styles.comparebar}`} style={{'transform': `translateY(-${tween}%)`}}>

                <ul className={styles.wrapper}>
                  {
                    compareLeft && compareLeft.map((item, i) =>
                      <li key={i} className={styles.box}>
                        <CardLoader card={item}></CardLoader>
                      </li>)
                  }
                </ul>
              </div>
            )}
        </Motion>

      </div>
    );
  }

}


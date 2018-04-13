import React, {Component} from 'react';
import {connect} from 'dva';

import Transition from 'react-motion-ui-pack';
import {Motion, spring} from 'react-motion';


import {Row, Col, Card, Button} from 'antd';
import LucaSideBar from '../../../common/LucaSidebar/LucaSidebar';
import CardShrinker from '../../../components/Cards/CardShrinker';

import styles from './BattlegroundCardSideBar.less';

export default class extends Component {

  render() {

    //music has the
    const { right, children } = this.props;

    return (

        <LucaSideBar open={true} right={right} width={100}>

          <Row>
            <Col>

              <Transition
                component="ul"
                className={styles.sidebar}
                enter={{
                  translateY: spring(0, {stiffness: 200, damping: 15})
                }}
                leave={{
                  translateY: 100
                }}
              >

                {children}

              </Transition>
            </Col>
          </Row>

        </LucaSideBar>

    );
  }
}

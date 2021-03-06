import React, {PureComponent} from 'react';
import {Layout, Menu, Icon} from 'antd';

const {Header} = Layout;
import pathToRegexp from 'path-to-regexp';
import {Link} from 'dva/router';
import styles from './LucaHeader.less';


export default class LucaHeader extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    const { currentUser } = this.props;

    return (
      <Header>
        <h2>{JSON.stringify(currentUser)}</h2>
      </Header>
    );
  }
}

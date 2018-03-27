import React, {Component} from 'react';
import {connect} from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

import styles from './StoreList.less';
/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {
  return {list: namespaces.store.list};
})
export default class extends Component {

  state = {
    list: [],
  };

  componentDidMount(preProps, prevState) {
    const {dispatch} = this.props;

     dispatch({
       type: 'store/fetch',
     });
  }

  render() {
    const { list , loading } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="progress">North</RadioButton>
          <RadioButton value="waiting">South</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="Search"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>anonymous</p>
        </div>

        <div className={styles.listContentItem}>
          <Progress percent={78} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>

          <Card
            className={styles.listCard}
            bordered={false}
            title="Stores"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >

            <List
              size="large"
              rowKey="id"
              loading={loading}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[<a>Edit</a> ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>Store NAME</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }

  oldrender() {

    const pageHeaderContent = (
      <div >
        <div >
          Your stores
        </div>
      </div>
    );

    const {list} = this.props;

    return (
      <PageHeaderLayout  content={pageHeaderContent}>
        <List
          dataSource={[{id : 1, name : {first : 'dfdf', last : 'dfdf'}}, {id : 2, name : {first : 'fhggyh', last : 'fghgh'}}]}
          renderItem={item => (
            <List.Item actions={[<a>edit</a> ]}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
      </PageHeaderLayout>
    );
  }
}

import React, { PureComponent } from 'react';
import moment from 'moment';
import CodeMirror from 'react-codemirror';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Modal } from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import MyFirstCard from '../../../components/Cards/TopLevel/MyFirstCard';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class DefineCard extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  render() {

    const data = [
      {
        title: 'My First Card',
        component: () => MyFirstCard
      },
      {
        title: 'By Gender',
      },
      {
        title: 'Title 3',
      }
    ];



    return (
      <PageHeaderLayout>
        <div>

          <Card
            bordered={false}
            title="Add cards to your dashboard"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >

            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
              dataSource={data}
              renderItem={item => (
                <List.Item>



                  <Row>
                    <Col  span={24}>
                      <Button>Add {item.title}
                        <div style={{zoom : 0.55}}><MyFirstCard/></div>
                      </Button>
                    </Col>
                  </Row>



                </List.Item>
              )}
            />

          </Card>
        </div>

        <Modal
          visible={true}
          width={1000}
          bodyStyle={{'height' : '60vh' }}
          title="Add new card to dashboard"
          footer={[]}
        >

          <Row gutter={16}>
            <Col span={6}></Col>
            <Col span={6}><pre>something else</pre></Col>

            <Col span={6}></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <h2>To view 'My First Card' in a dashboard, you must populate our data store with your data.</h2>
              <h3><pre>POST /cards/myfirstcard/soho</pre></h3>

              with the following data <a>test</a>

              <pre>{JSON.stringify(new MyFirstCard().sample)}</pre>

            </Col>

            <Col span={12}><MyFirstCard/></Col>

          </Row>



        </Modal>

      </PageHeaderLayout>
    );
  }
}

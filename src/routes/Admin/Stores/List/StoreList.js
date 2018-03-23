import React, {Component} from 'react';
import {connect} from 'dva';
import {Row, Col, Card,  List, Avatar, Button, Spin } from 'antd';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

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
       payload : {'type' : 'store' , 'store_id' : 1  }
     });
  }

  render() {

    const {list} = this.props;

    return (
      <PageHeaderLayout>
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={[{id : 1, name : {first : 'dfdf', last : 'dfdf'}}, {id : 2, name : {first : 'fhggyh', last : 'fghgh'}}]}
          renderItem={item => (
            <List.Item actions={[<a>edit</a>, <a>more</a>]}>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </List.Item>
          )}
        />
      </PageHeaderLayout>
    );
  }
}

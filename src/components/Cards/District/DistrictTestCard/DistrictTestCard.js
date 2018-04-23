import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';


export default class extends React.Component {
  constructor() {
    super();
  }

  render() {

    const {data, extra} = this.props;

    return (
      <Card title={data.test} style={{'height' : '80px'}} extra={extra}>

        <div id="content"  style={{'zIndex' : 3}}>
            test
        </div>

      </Card>
    );
  }
}





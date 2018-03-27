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

    const {data} = this.props;

    return (
      <Card title={data.name} style={{'height' : '100%', 'overflow': 'hidden', 'background-color' : 'rgba(255,255,255,1)'}}>

        <Row >

          <Col>

            <p>Population : {data.Something}</p>
            <p>Postcode : {data.postcode}</p>

          </Col>

        </Row>


      </Card>
    );
  }
}





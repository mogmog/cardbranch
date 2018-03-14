import React from "react";
import FieldChanger from './FieldChanger';
import {
  Row,
  Col,
} from 'antd';

export default class Standard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...props.formData};
  }

  render() {

    return (
      <div>
        <Row>
          {(this.props.properties).map(prop => (
            <Col span={24} key={prop.content.key}>
              {true && <FieldChanger updateSchema={this.props.updateSchema.bind(this)} _key={prop.content.key}></FieldChanger>}
              {prop.content}
            </Col>
          ))}
        </Row>
      </div>
    );



  }
}

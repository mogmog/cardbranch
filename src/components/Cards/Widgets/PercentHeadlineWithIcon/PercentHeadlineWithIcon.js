import React from 'react';
import * as d3 from 'd3';

import {
  Row,
  Col
} from 'antd';

export default class extends React.Component {
  constructor() {
    super();
  }

  render() {

    const {zoom=1, amount, total, label, domain, icon, change } = this.props;

    return (
      <div style={{'zoom': zoom}}>

        <Row>
          <Col span={12}>
            <h2> {d3.format('.1%')(amount / total)} {change} </h2>

            <h3> {label}</h3>

            <h4> {total} {domain} </h4>
          </Col>

          <Col span={12}>
            {icon}
          </Col>
        </Row>


      </div>
    );
  }
}


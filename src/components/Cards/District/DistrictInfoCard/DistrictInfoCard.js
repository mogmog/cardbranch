import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';

import DistrictThumbnail from './../../../Maps/DistrictThumbnail/DistrictThumbnail';

export default class extends React.Component {
  constructor() {
    super();
  }

  _getTitle(data) {
    return (
      <span>{data.name}
        <DistrictThumbnail geojson={data.geojson}/>
      </span>
    )
  }

  render() {

    const {data} = this.props;

    return (
      <Card xtitle={this._getTitle(data) } style={{'height' : '100%', 'overflow': 'hidden', 'backgroundColor' : 'rgba(255,255,255,1)'}}>

        <Row >

          <Col span={10}>
            <h1>  {data.name} </h1>
          </Col>
          <Col span={14}>
            <DistrictThumbnail geojson={data.geojson}/>
          </Col>


        </Row>

        <Row>

          <Col>

            <p>Population : {data.Something}</p>
            <p>Postcode : {data.postcode}</p>

          </Col>


        </Row>

      </Card>
    );
  }
}





import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';

import styles from './DistrictInfoCard.css';

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
      <Card style={{'height' : '350px'}}>

        <div id="content"  style={{'zIndex' : 3}}>

          <h1> {data.name} </h1>
          <p>Population : {data.Something}</p>
          <p>Postcode : {data.postcode}</p>
        </div>

        <div id="map-background">
          <DistrictThumbnail geojson={data.geojson}/>
        </div>


      </Card>
    );
  }
}





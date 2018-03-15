import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';

import ReactStreetview from 'react-streetview';

export default class extends React.Component {
  constructor() {
    super();
  }

  render() {

    const {item} = this.props;

    const googleMapsApiKey = 'AIzaSyA5mtcRwZ63yYp3CSJNM3CWi5LV9C14-78';

    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    const streetViewPanoramaOptions = {
      position: {lat: 46.9171876, lng: 17.8951832},
      pov: {heading: 100, pitch: 0},
      zoom: 1
    };


    return (
      <Card title={`Store ${item.id}`} style={{'height' : '100%', 'overflow': 'hidden', 'background-color' : 'rgba(255,255,255,1)'}}>

        <Row >

          <Col>
            <div style={{'height' : '250px'}}>
              <ReactStreetview
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
              />
            </div>
          </Col>

        </Row>


      </Card>
    );
  }
}





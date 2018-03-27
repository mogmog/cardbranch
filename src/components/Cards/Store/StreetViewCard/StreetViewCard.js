import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';

import ReactStreetview from 'react-streetview';

import styles from './StreetViewCard.less';

export default class extends React.Component {
  constructor() {
    super();
  }

  render() {

    const {data} = this.props;

/*    return (
      <Card title="sdfdf" style={{'height' : '100%', 'overflow': 'hidden', 'background-color' : 'rgba(255,255,255,1)'}}>
          i am card
      </Card>
    );*/

    return (
      <Card title={`${data.name}`} style={{'height' : '100%', 'overflow': 'hidden', 'backgroundColor' : 'rgba(255,255,255,1)'}}>

        <Row >

          <Col>

            <div className={styles.streetviewcard} style={{'height' : '250px'}}>
              <div style={{
                width: '800px',
                height: '450px',
                backgroundColor: '#eeeeee'
              }}>
                <img src={`https://maps.googleapis.com/maps/api/streetview?size=250x200&location=${data.coordinates.latitude},${data.coordinates.longitude}&heading=151.78&pitch=-0.76&key=AIzaSyA5mtcRwZ63yYp3CSJNM3CWi5LV9C14-78`} />
              </div>
            </div>
          </Col>

        </Row>


      </Card>
    );
  }
}





import React from 'react';

import {
  Row,
  Col,
  Icon,
  Button,
  Card,
  Tabs,
  Modal,
  Table,
  Radio,
  DatePicker,
  Menu,
  Dropdown,
} from 'antd';

import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

import ReactCardFlip from 'react-card-flip';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw",
});

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      isFlipped: false,
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({isFlipped: !this.state.isFlipped});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {

    const { data } = this.props;
    const {visible, postcode} = this.state;

    return (

      <div style={{'height' : '328px'}}>

        <ReactCardFlip isFlipped={this.state.isFlipped} >

          <div key="front">
            <Card>

              <Button type="primary" onClick={this.showModal.bind(this)}>
                View timeline
              </Button>

            </Card>
          </div>

          <div key="back">
            <Card>
              back
              <pre>
                 {/* {JSON.stringify(data)}*/}
                </pre>
            </Card>
          </div>


        </ReactCardFlip>

        <Modal
          visible={visible}
          width={1000}
          bodyStyle={{'height' : '60vh' }}
          title="Somethinh to do with timelines"
          onCancel={this.handleCancel}
          footer={[]}
        >

          <Row>

            <Col span={24}>

              <div className='session'>
                <h2>Hour: <label id='active-hour'>12PM</label></h2>
                <input id='slider' className='row' type='range' min='0' max='23' step='1' value='12' />
              </div>

              <Map
                style="mapbox://styles/mapbox/light-v9"
                containerStyle={{
                  height: "250px",
                  width: "100%",
                  position: 'absolute',
                }}
                center={ [-74.0059, 40.7128]}
                zoom={[11]}
                onStyleLoad={(map) => {

                  var filterHour = ['==', ['number',['get', 'Hour']], 12];
                  var filterDay = ['!=', ['string',['get', 'Day']], 'placeholder'];

                  map.addLayer({
                    id: 'collisions',
                    type: 'circle',
                    source: {
                      type: 'geojson',
                      data: data
                    },
                    paint: {
                      'circle-radius': [
                        'interpolate',
                        ['linear'],
                        ['number', ['get', 'Casualty']],
                        0, 4,
                        5, 24
                      ],
                      'circle-color': [
                        'interpolate',
                        ['linear'],
                        ['number', ['get', 'Casualty']],
                        0, '#2DC4B2',
                        1, '#3BB3C3',
                        2, '#669EC4',
                        3, '#8B88B6',
                        4, '#A2719B',
                        5, '#AA5E79'
                      ],
                      'circle-opacity': 0.8
                    },
                    'filter': ['all', filterHour]
                  }, 'admin-2-boundaries-dispute');


                  // update hour filter when the slider is dragged
                  document.getElementById('slider').addEventListener('input', function(e) {
                    var hour = parseInt(e.target.value);
                    // update the map
                    filterHour = ['==', ['number', ['get', 'Hour']], hour];
                    map.setFilter('collisions', ['all', filterHour]);

                    // converting 0-23 hour to AMPM format
                    var ampm = hour >= 12 ? 'PM' : 'AM';
                    var hour12 = hour % 12 ? hour % 12 : 12;

                    // update text in the UI
                    document.getElementById('active-hour').innerText = hour12 + ampm;
                  });
                }}
              >

              </Map>

            </Col>

          </Row>

        </Modal>

      </div>
    )
  }
}





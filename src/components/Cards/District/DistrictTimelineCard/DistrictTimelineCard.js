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
  Slider,
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
      hour : 0
    };
  }

  onChange(value) {
    this.setState({
      hour: value,
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.map) this.map.setFilter('collisions', ['all', ['==', ['number', ['get', 'Hour']], nextState.hour]]);
  }

  play() {
    const that = this;
    let hour = that.state.hour;
    setInterval(()=> {
      if (hour < 24) that.setState({'hour': hour++ });
    }, 400);
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

    const { data, extra } = this.props;
    const {visible, hour} = this.state;

    const title= (<Button type="primary" onClick={this.showModal.bind(this)}> View timeline </Button>)

    return (

      <div style={{'height' : '328px'}}>

        <ReactCardFlip isFlipped={this.state.isFlipped} >

          <div key="front">
            <Card title={title} extra={extra}>

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
          title="Previous days movements"
          onCancel={this.handleCancel}
          footer={[]}
        >

          <Row>

            <Col span={24}>

              <Row>
                <Col span={20}>
                      <Slider min={1} max={24} onChange={this.onChange.bind(this)} value={hour} />
                </Col>

                <Col span={4}>
                 <h2>{hour}:00</h2>
                </Col>

              </Row>

              <Icon onClick={this.play.bind(this)} type="play-circle" />



              <Map
                style="mapbox://styles/mapbox/light-v9"
                containerStyle={{
                  height: "250px",
                  width: "100%",
                  position: 'absolute',
                }}

                onStyleLoad={(map) => {

                  this.map = map;
                  this.map.setZoom([11]);
                  this.map.setCenter([-74.0059, 40.7128]);
                  var filterHour = ['==', ['number',['get', 'Hour']], 12];

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





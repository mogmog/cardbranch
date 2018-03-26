import React from 'react';
import {Row, Col, Button, DatePicker, Card} from 'antd';
import CardLoader from '../../../components/Cards/CardLoader';
import d3 from 'd3';
import Slider from 'react-slick'

import styles from './Cloropleth.less';

import ReactMapboxGl, {Layer, Source, Feature, Marker, Popup} from "react-mapbox-gl";
import {connect} from "dva";

import StoreMarker from '../../../components/Maps/StoreMap/StoreMarker';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {
  return {districts: namespaces.district.geojson};
})
export default class extends React.Component {

  constructor() {
    super();
    this.state = {hasAddedSource: false, hoveredZone: null};
  }

  panToA() {
    this.map.flyTo({center: [-121.478851, 38.575764]});
  }

  panToB() {
    this.map.flyTo({center: [-77.014576, 38.899396]});
  }

  show() {

    const {dispatch} = this.props;

    dispatch({
      type: 'district/fetch',
      payload: {'id': 1}
    });
  }

  markerClick() {
    const {dispatch} = this.props;

    dispatch({
      type: 'card/fetchcards',
      payload: {'type': 'store', 'store_id': 1}
    });
  }

  render() {

    var COLORS = ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'], BREAKS = [0, 1, 5, 10, 15, 20];

    const {districts} = this.props;


    if (this.map) {
      this.map.getSource('districts').setData(districts);
    }

    const {station, point} = this.state;

    const that = this;

    return (
      <div>

        <Button onClick={this.panToA.bind(this)}> West </Button>

        <Button onClick={this.panToB.bind(this)}> East </Button>

        <Row>
          <Col>

            <Map

              onStyleLoad={(map) => {

                this.map = map;

                map.addSource("districts", {
                  "type": "geojson",
                  "data": districts,
                });

                map.addLayer({
                  id: 'districtfill',
                  type: 'fill',
                  source: 'districts',
                  paint: {
                    "fill-color": {
                      property: 'frequency',
                      stops: [
                        [BREAKS[0], COLORS[0]],
                        [BREAKS[1], COLORS[1]],
                        [BREAKS[2], COLORS[2]],
                        [BREAKS[3], COLORS[3]],
                        [BREAKS[4], COLORS[4]],
                        [BREAKS[5], COLORS[5]]]
                    },
                    "fill-opacity": 0.7,
                    "fill-outline-color": "#ffffff"
                  }
                })
              }}

              style="mapbox://styles/mapbox/light-v9"
              containerStyle={{
                height: "100vh",
                width: "100vw"
              }}>

              <StoreMarker onClick={this.show.bind(this)} coordinates={[-0.27179632, 51.5073509]} store={{'id': 1}}/>

              <StoreMarker onClick={this.show.bind(this)} coordinates={[-0.17563939, 51.55516]} store={{'id': 2}}/>

              <StoreMarker onClick={this.show.bind(this)} coordinates={[-0.2125, 51.5721]} store={{'id': 3}}/>

              <StoreMarker onClick={this.show.bind(this)} coordinates={[-0.2168115, 51.5723821]} store={{'id': 4}}/>

            </Map>

          </Col>

          <Row>
            A table
          </Row>
        </Row>


      </div>
    )
  }
}

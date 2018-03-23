import React from 'react';
import {Button, DatePicker, Card} from 'antd';
import CardLoader from '../../../components/Cards/CardLoader';
import d3 from 'd3';
import Slider from 'react-slick'

import styles from './Cloropleth.less';

import ReactMapboxGl, {Layer, Source, Feature, Marker, Popup } from "react-mapbox-gl";
import {connect} from "dva";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

//globals for the choropleth
var COLORS = ['red', 'blue', 'green', 'yellow'],
  BREAKS = [0, 1, 2, 3],
  FILTERUSE;

const options = [{
  name: 'Population',
  description: 'Estimated total population',
  property: 'pop_est',
  stops: [
    [0, '#f8d5cc'],
    [1000000, '#f4bfb6'],
    [5000000, '#f1a8a5'],
    [10000000, '#ee8f9a'],
    [50000000, '#ec739b'],
    [100000000, '#dd5ca8'],
    [250000000, '#c44cc0'],
    [500000000, '#9f43d7'],
    [1000000000, '#6e40e6']
  ]
}];

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {
  return {list: namespaces.card.list};
})
export default class extends React.Component {

  constructor() {
    super();
    this.state = {hasAddedSource: false, hoveredZone: null};
  }

  panToA() {
    this.map.flyTo({center: [-77.01967540856717, 38.951906907656614]});
  }

  panToB() {
    this.map.flyTo({center: [-77.014576, 38.899396]});
  }

  markerClick() {
    const {dispatch} = this.props;

    dispatch({
      type: 'card/fetchcards',
      payload: {'type': 'store', 'store_id': 1}
    });
  }

  render() {

  const {list} = this.props;
  const {station, point} = this.state;

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

  const that = this;

    return (
      <div>

        <Button onClick={this.panToA.bind(this)}> West Gate </Button>

        <Button onClick={this.panToB.bind(this)}> Grafton Centre </Button>

        <Map

          onStyleLoad={(map) => {

            this.map = map;

            map.addSource('county_geo_data', {
              'type': 'vector',
              'url': 'mapbox://stamen.cccc8kgi'
            });

            map.addSource('tract_geo_data', {
              'type': 'vector',
              'url': 'mapbox://stamen.42zqg3sk'
            });

            map.addSource('block_geo_data', {
              'type': 'vector',
              'url': 'mapbox://stamen.0ujdjkh2'
            });

            map.addLayer({
              'id': 'county',
              'source': 'county_geo_data',
              'source-layer': 'county_geo_data',
              'maxZoom': 9,
              'type': 'fill',
              'paint': {
                'fill-color': {
                  property: 'poverty_rate',
                  stops: [
                    [0, '#F2F12D'],
                    [0.1, '#EED322'],
                    [0.2, '#E6B71E'],
                    [0.3, '#DA9C20'],
                    [0.4, '#CA8323']
                  ]
                },
                'fill-opacity': 0.75
              }
            }, 'waterway-label');

            map.on('click', 'county', function (e) {
              var features = map.queryRenderedFeatures(e.point);
              that.setState({'station' : features[0]});
              that.markerClick();
            });

            }}
          style="mapbox://styles/mapbox/light-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>

          {station && list && (
            <Popup key={station.properties.geoid} coordinates={station.geometry.coordinates[0][0]}>

              <div className={styles.wrapper}>

                {list.map((item, i) =>
                  <div key={i} className={styles.box}>
                    <CardLoader card={item}></CardLoader>
                  </div>
                )
                }

              </div>

            </Popup>
          )}

        </Map>
      </div>
    )
  }
}

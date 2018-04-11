import React from 'react';
import {Popconfirm, Tabs, Row, Col, Button, Icon, message} from 'antd';
import CardLoader from '../../../components/Cards/CardLoader';

import d3 from 'd3';
import Slider from 'react-slick'

import styles from './Cloropleth.less';

import mapboxgl from 'mapbox-gl';

import ReactMapboxGl, {Layer, Source, Feature, Marker, Popup} from "react-mapbox-gl";
import {connect} from "dva";

import HeatMapControl from '../../../components/Maps/HeatmapControl/HeatmapControl';
import CompareBar from '../../../common/LucaCompareBar/LucaCompareBar';
import LucaSideBar from '../../../common/LucaSidebar/LucaSidebar';
import StoreMarker from '../../../components/Maps/StoreMap/StoreMarker';

const TabPane = Tabs.TabPane;

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

const COLORS = ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'];
const BREAKS = [0, 1, 5, 10, 15, 20];

const STOPS = [
  [BREAKS[0], COLORS[0]],
  [BREAKS[1], COLORS[1]],
  [BREAKS[2], COLORS[2]],
  [BREAKS[3], COLORS[3]],
  [BREAKS[4], COLORS[4]],
  [BREAKS[5], COLORS[5]]
];

const OPACITY_STOPS = [
  [BREAKS[0], 0.2],
  [BREAKS[1], 0.3],
  [BREAKS[2], 0.4],
  [BREAKS[3], 0.5],
  [BREAKS[4], 0.55],
  [BREAKS[5], 0.6]];

const HEATMAP = {
  // Increase the heatmap weight based on frequency and property magnitude
  "heatmap-weight": {
    "type": "identity",
    "property": "mag",
  }
}

const HEATMAP_DIFFERENT = {
  // Increase the heatmap weight based on frequency and property magnitude
  "heatmap-weight": {
    "type": "identity",
    "property": "different",
  },
}

const CHORO = {
  "fill-color": {
    property: 'frequency',
    stops: STOPS
  },
  "fill-opacity": {
    property: 'frequency',
    stops: OPACITY_STOPS,
  },
  "fill-outline-color": "#ffffff"
};

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {

  //console.log(namespaces);

  return {
    storecards: namespaces.card.storecardlist,
    districtcards: namespaces.card.districtcardllist,
    districts: namespaces.district.geojson,
    heatmap: namespaces.heatmap
  };
})
export default class extends React.Component {

  constructor() {
    super();
    this.state = {zoomed: false, selectedStore: null, activeTab: '0', compareLeft: [], compareRight: [], sidebarOpen: false};
  }

  componentDidMount() {

    const {dispatch} = this.props;

    dispatch({
      type: 'district/clear',
    });

    dispatch({
      type: 'heatmap/clear',
    });


  }

  sendLeft() {

    const {dispatch} = this.props;

    this.setState({'sidebarOpen': false, 'compareLeft': this.props.districtcards});
    if (this.map) {
      this.map.setZoom(11);
      this.map.setFilter("districtfill", ["!=", "name", ""]);
    }
  }

  sendRight() {

    const {dispatch} = this.props;

    this.setState({'sidebarOpen': false, 'compareRight': this.props.districtcards});
    if (this.map) {
      this.map.setZoom(11);
      this.map.setFilter("districtfill", ["!=", "name", ""]);
    }
  }

  getDistrictCards(clickedOnName) {
    const {dispatch} = this.props;

    message.info(clickedOnName + ' selected');

    this.map.setFilter("districtfill", ["!=", "name", ""]);

    dispatch({
      type: 'card/fetchdistrictcards',
      payload: {'type': 'district', 'id': clickedOnName}
    });
  }

  clearDistrictCards() {
    const {dispatch} = this.props;

    dispatch({
      type: 'card/cleardistrictcards',
    });
  }


  zoomOut() {
   this.map.flyTo({zoom : 11});
   this.map.setFilter("districtfill", ["!=", "name", ""]);
  }

  zoomToDistrict(clickedOnName, map) {

    let bounds = new mapboxgl.LngLatBounds();

    this.props.districts.features.find(x => x.properties.name === clickedOnName).geometry.coordinates[0].forEach(function (feature) {
      bounds.extend(feature);
    });

    map.fitBounds(bounds);
  }

  fadeOutOtherDistricts(clickedOnName) {
    this.map.setFilter("districtfill", ["==", "name", clickedOnName]);
  }

  showHeatmap() {

    const { dispatch } = this.props;
    const { district } = this.state;

      dispatch({
        type: 'heatmap/fetch',
        payload: {'district': district}
      });

  }

  changeHeatmapLayers(items) {

    this.map.setLayoutProperty('heatmap_male', 'visibility', 'none');
    this.map.setLayoutProperty('heatmap_female', 'visibility', 'none');

    items.forEach(item => {
      this.map.setLayoutProperty(item, 'visibility', 'visible');
    });
  }

  hideHeatmap() {

    const {dispatch} = this.props;

    dispatch({
      type: 'heatmap/clear',
    });
  }


  showDistricts() {

    message.info(' Showing visitors by xxxxx');

    const {dispatch} = this.props;

    let o = dispatch({
      type: 'district/fetch',
      payload: {'id': 1}
    });



  }

  markerClick(store) {
    const {dispatch, districts} = this.props;

    this.setState({'sidebarOpen': true, selectedStore: store, activeTab: '0'});

    if (!this.state.zoomed) {
      this.map.flyTo({ center: store.coordinates, speed : 0.2});
      this.map.setFilter("districtfill", ["!=", "name", ""]);

      dispatch({
        type: 'district/clear',
      });

      /*get the cards for the clicked on store*/
      dispatch({
        type: 'card/fetchstorecards',
        payload: {'type': 'store', 'id': store.id}
      });
    }

  }

  render() {

    const {districts, storecards, districtcards, heatmap} = this.props;
    const {activeTab, compareLeft, compareRight, sidebarOpen, zoomed} = this.state;
    const that = this;

    if (that.map) {
      that.map.getSource('districts').setData(districts);
      that.map.getSource('heatmap_male').setData(heatmap.male);
      that.map.getSource('heatmap_female').setData(heatmap.female);
      that.map.setPaintProperty('districtfill', 'fill-color', { 'property': 'frequency', 'stops': STOPS });
    }

    const showDistricts = (<span>
                            <Button title='View where visitors live' onClick={this.showDistricts.bind(this)}><Icon
                              type={'home'}> </Icon></Button>
                            <Button title='View where visitors work' onClick={this.showDistricts.bind(this)}><Icon
                              type={'database'}> </Icon></Button>
                         </span>);

    /*context specifc buttons for particular cards*/
    const extras = {
      'StoreStreetViewCard': showDistricts
    };

    return (
      <div>

        <div>
          {zoomed &&  <HeatMapControl onChange={this.changeHeatmapLayers.bind(this)}></HeatMapControl> }
        </div>

        <Row>
          <Col>

            <LucaSideBar right={false} open={sidebarOpen} width={25}>

              <Tabs defaultActiveKey={'0'} activeKey={activeTab}>
                <TabPane tab="" key="0">

                  <ul className={styles.sidebar}>

                    {
                      storecards && storecards.map((item, i) =>
                        (<li key={i}>
                          <CardLoader extra={extras[item.component] || <span></span>} card={item}></CardLoader>
                        </li>))
                    }

                  </ul>


                </TabPane>
                <TabPane tab="" key="1">

                  <Popconfirm title="Select which side"
                              okText="Right"
                              cancelText="Left"
                              onConfirm={this.sendRight.bind(this)}
                              onCancel={this.sendLeft.bind(this)}>
                    <a href="#">Compare</a>
                  </Popconfirm>

                  <ul className={styles.sidebar}>
                    {
                      districtcards && districtcards.map((item, i) =>
                        <li key={i}>
                          <CardLoader extra={extras[item.component] || <span></span>} card={item}></CardLoader>
                        </li>)
                    }
                  </ul>

                </TabPane>
              </Tabs>

            </LucaSideBar>

            <Map

              onStyleLoad={(map) => {

                this.map = map;

                map.addSource('districts', {
                  type: 'geojson',
                  data: districts,
                });

                map.addSource('heatmap_male', {
                  "type": "geojson",
                  "data": heatmap.male
                });

                map.addSource('heatmap_female', {
                  "type": "geojson",
                  "data": heatmap.female
                });

                map.addLayer({
                  id: 'districtfill',
                  type: 'fill',
                  source: 'districts',
                  paint: CHORO
                });

                map.addLayer({
                  id: 'heatmap_male',
                  type: 'heatmap',
                  source: 'heatmap_male',
                  maxzoom: 15,
                  paint: {
                    // increase weight as diameter breast height increases
                    'heatmap-weight': {
                      property: 'mag',
                      type: 'exponential',
                      stops: [
                        [1, 0],
                        [100, 1]
                      ]
                    },
                    // increase intensity as zoom level increases
                    'heatmap-intensity': {
                      stops: [
                        [11, 1],
                        [15, 3]
                      ]
                    },
                    // assign color values be applied to points depending on their density
                    'heatmap-color': [
                      'interpolate',
                      ['linear'],
                      ['heatmap-density'],
                      0, 'rgba(236,0,30,0)',
                      0.2, 'rgb(208,0,30)',
                      0.4, 'rgb(166,0,30)',
                      0.6, 'rgb(103,0,30)',
                      0.8, 'rgb(28,0,30)'
                    ],
                    // increase radius as zoom increases
                    'heatmap-radius': {
                      stops: [
                        [11, 15],
                        [15, 20]
                      ]
                    },
                    // decrease opacity to transition into the circle layer
                    'heatmap-opacity': {
                      default: 0.5,
                      stops: [
                        [1, 0.8],
                        [15, 0.5]
                      ]
                    },
                  }
                });

                map.addLayer({
                  id: 'heatmap_female',
                  type: 'heatmap',
                  source: 'heatmap_female',
                  maxzoom: 15,
                  paint: {
                    // increase weight as diameter breast height increases
                    'heatmap-weight': {
                      property: 'mag',
                      type: 'exponential',
                      stops: [
                        [1, 0],
                        [62, 1]
                      ]
                    },
                    // increase intensity as zoom level increases
                    'heatmap-intensity': {
                      stops: [
                        [11, 1],
                        [15, 3]
                      ]
                    },
                    // assign color values be applied to points depending on their density
                    'heatmap-color': [
                      'interpolate',
                      ['linear'],
                      ['heatmap-density'],
                      0, 'rgba(136,22,249,0)',
                      0.2, 'rgb(108,29,240)',
                      0.4, 'rgb(066,89,249)',
                      0.6, 'rgb(03,69,247)',
                      0.8, 'rgb(18,44,183)'
                    ],
                    // increase radius as zoom increases
                    'heatmap-radius': {
                      stops: [
                        [11, 15],
                        [15, 20]
                      ]
                    },
                    // decrease opacity to transition into the circle layer
                    'heatmap-opacity': {
                      default: 0.5,
                      stops: [
                        [1, 0.8],
                        [15, 0.5]
                      ]
                    },
                  }
                });








                map.addLayer({
                  id: "state-fills-hover",
                  type: "line",
                  source: "districts",
                  paint: {
                    "line-color": "#627BC1",
                  },
                  filter: ["==", "name", ""]
                });

                map.setZoom(11);

                map.on('click', 'districtfill', function (e) {

                  that.setState({zoomed : !that.state.zoomed, sidebarOpen: true, activeTab: that.state.zoomed ? '0' : '1'});

                  const clickedOnName = e.features[0].properties.name;

                  if (that.state.zoomed) {
                    that.setState({'district' : e.features[0]});
                    that.getDistrictCards(clickedOnName);
                    that.fadeOutOtherDistricts(clickedOnName);
                    that.zoomToDistrict(clickedOnName, map);
                    that.showHeatmap();

                  } else {
                    that.setState({'district' : null});
                    that.clearDistrictCards();
                    that.zoomOut();
                    that.hideHeatmap();

                  }
                });

                map.on("mousemove", "districtfill", function (e) {
                  map.setFilter("state-fills-hover", ["==", "name", e.features[0].properties.name]);
                });



              }}

              style="mapbox://styles/mogmog/cjfl7wk44btwu2sqwep298upn"
              containerStyle={{

                height: "100vh",
                width: "100vw"
              }}>

              <StoreMarker selected={this.state.selectedStore && this.state.selectedStore.id === 1}
                           onClick={this.markerClick.bind(this)} coordinates={[-0.097, 51.53073509]}
                           store={{'id': 1, coordinates : [-0.097, 51.53073509]}}/>

              <StoreMarker selected={this.state.selectedStore && this.state.selectedStore.id === 2}
                           onClick={this.markerClick.bind(this)} coordinates={[-0.17563939, 51.55516]}
                           store={{'id': 2, 'coordinates' : [-0.17563939, 51.55516]}}/>

            </Map>

          </Col>

        </Row>

        <CompareBar open={compareLeft.length && compareRight.length && activeTab === '1'} compareLeft={compareLeft} compareRight={compareRight}> </CompareBar>

      </div>
    )
  }

}

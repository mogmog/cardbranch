import React from 'react';
import {Popconfirm, Tabs, Row, Col, Button, Icon} from 'antd';
import CardLoader from '../../../components/Cards/CardLoader';

import d3 from 'd3';
import Slider from 'react-slick'

import styles from './Cloropleth.less';

import mapboxgl from 'mapbox-gl';

import ReactMapboxGl, {Layer, Source, Feature, Marker, Popup} from "react-mapbox-gl";
import {connect} from "dva";

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

const CHORO = {
  "fill-color": {
    property: 'frequency',
    stops: STOPS
  },
  "fill-opacity": {
    property: 'frequency',
    stops: [
      [BREAKS[0], 0.2],
      [BREAKS[1], 0.3],
      [BREAKS[2], 0.4],
      [BREAKS[3], 0.5],
      [BREAKS[4], 0.55],
      [BREAKS[5], 0.6]]
  },
  "fill-outline-color": "#ffffff"
};

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {

  //console.log(namespaces);

  return {
    storecards: namespaces.card.list,
    districtcards: namespaces.card.districtcardllist,
    districts: namespaces.district.geojson
  };
})
export default class extends React.Component {

  constructor() {
    super();
    this.state = {selectedStore: null, activeTab: '0', compareLeft: [], compareRight: [], sidebarOpen: false};
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'district/clear',
    });
  }

  sendLeft() {

    const {dispatch} = this.props;

    this.setState({'sidebarOpen': false, 'compareLeft': this.props.districtcards});
    if (this.map) this.map.setZoom(11);

    /* dispatch({
       type: 'district/clear',
     })*/
  }

  sendRight() {

    const {dispatch} = this.props;

    this.setState({'sidebarOpen': false, 'compareRight': this.props.districtcards});
    if (this.map) this.map.setZoom(11);

    /* dispatch({
       type: 'district/clear',
     });*/

  }

  getDistrictCards(clickedOnName) {
    const {dispatch} = this.props;

    dispatch({
      type: 'card/fetchdistrictcards',
      payload: {'type': 'district', 'district_name': clickedOnName}
    });
  }

  zoomToDistrict(clickedOnName, map) {

    //this.setState({'compareLeft' : [], 'compareRight': []});

    var bounds = new mapboxgl.LngLatBounds();

    //this.map.setPaintProperty('districtfill', 'opacity', {'property': 'frequency', 'stops' : []});

    this.props.districts.features.find(x => x.properties.name === clickedOnName).geometry.coordinates[0].forEach(function (feature) {
      bounds.extend(feature);
    });

    map.fitBounds(bounds);
  }

  showDistricts() {

    const {dispatch} = this.props;

    let o = dispatch({
      type: 'district/fetch',
      payload: {'id': 1}
    });

  }

  markerClick(store) {
    const {dispatch, districts} = this.props;

    //this.map.setPaintProperty('districtfill', 'opacity', {'property': 'frequency', 'stops' : STOPS});

    this.setState({'sidebarOpen': true, selectedStore: store, activeTab: '0'});

    dispatch({
      type: 'district/clear',
    });

    /*get the cards for the clicked on store*/
    dispatch({
      type: 'card/fetchcards',
      payload: {'type': 'store', 'store_id': store.id}
    });
  }

  render() {

    const {districts, storecards, districtcards} = this.props;
    const {activeTab, compareLeft, compareRight, sidebarOpen} = this.state;
    const that = this;

    if (that.map) {
      that.map.getSource('districts').setData(districts);
      that.map.setPaintProperty('districtfill', 'fill-color', { 'property': 'frequency', 'stops': STOPS });
    }

    const extras = {
      'StreetViewCard': (<span>
                            <Button title='View where visitors live' onClick={this.showDistricts.bind(this)}><Icon
                              type={'home'}> </Icon></Button>
                            <Button title='View where visitors work' onClick={this.showDistricts.bind(this)}><Icon
                              type={'database'}> </Icon></Button>
                         </span>)
    };

    return (
      <div>

        <Row>
          <Col>

            <LucaSideBar right={false} open={sidebarOpen} width={25}>

              <Tabs defaultActiveKey={'0'} activeKey={activeTab}>
                <TabPane tab="Store" key="0">


                  <ul className={styles.sidebar}>

                    {
                      storecards && storecards.map((item, i) =>
                        (<li key={i}>
                          <CardLoader extra={extras[item.component] || <span></span>} card={item}></CardLoader>
                        </li>))
                    }

                  </ul>


                </TabPane>
                <TabPane tab="Selected District" key="1">

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
                          <CardLoader card={item}></CardLoader>
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

                map.addLayer({
                  id: 'districtfill',
                  type: 'fill',
                  source: 'districts',
                  paint: CHORO
                });

                map.addLayer({
                  "id": "state-fills-hover",
                  "type": "line",
                  "source": "districts",
                  "paint": {
                    "line-color": "#627BC1",
                  },
                  "filter": ["==", "name", ""]
                });

                map.setZoom(11);

                map.on('click', 'districtfill', function (e) {

                  that.setState({sidebarOpen: true, activeTab: '1'});

                  const clickedOnName = e.features[0].properties.name;

                  that.getDistrictCards(clickedOnName);
                  that.zoomToDistrict(clickedOnName, map);

                });

                map.on("mousemove", "districtfill", function (e) {
                  map.setFilter("state-fills-hover", ["==", "name", e.features[0].properties.name]);
                });
              }}

              style="mapbox://styles/mapbox/light-v9"
              containerStyle={{

                height: "100vh",
                width: "100vw"
              }}>

              <StoreMarker selected={this.state.selectedStore && this.state.selectedStore.id === 1}
                           onClick={this.markerClick.bind(this)} coordinates={[-0.097, 51.53073509]}
                           store={{'id': 1}}/>

              <StoreMarker selected={this.state.selectedStore && this.state.selectedStore.id === 2}
                           onClick={this.markerClick.bind(this)} coordinates={[-0.17563939, 51.55516]}
                           store={{'id': 2}}/>

            </Map>

          </Col>

        </Row>

        <CompareBar open={compareLeft.length && compareRight.length && activeTab === '1'} compareLeft={compareLeft}
                    compareRight={compareRight}> </CompareBar>

      </div>
    )
  }

}

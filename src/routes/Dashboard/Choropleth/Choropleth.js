import React from 'react';
import {Row, Col, Button, DatePicker, Card} from 'antd';
import CardLoader from '../../../components/Cards/CardLoader';
import d3 from 'd3';
import Slider from 'react-slick'

import styles from './Cloropleth.less';

import ReactMapboxGl, {Layer, Source, Feature, Marker, Popup} from "react-mapbox-gl";
import {connect} from "dva";

import LucaSideBar from '../../../common/LucaSidebar/LucaSidebar';
import StoreMarker from '../../../components/Maps/StoreMap/StoreMarker';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {
  return {
    storecards: namespaces.card.list,
    districtcards: namespaces.card.districtcardllist,
    districts: namespaces.district.geojson
  };
})
export default class extends React.Component {

  constructor() {
    super();
    this.state = {selectedStore: null};
  }

  markerClick(store) {
    const {dispatch} = this.props;

    this.setState({selectedStore: store});

    /*get the district chorograph for the clicked on store*/
    dispatch({
      type: 'district/fetch',
      payload: {'id': 1}
    });

    /*get the cards for the clicked on store*/
    dispatch({
      type: 'card/fetchcards',
      payload: {'type': 'store', 'store_id': store.id}
    });
  }

  render() {

    var COLORS = ['#8c510a', '#d8b365', '#f6e8c3', '#c7eae5', '#5ab4ac', '#01665e'], BREAKS = [0, 1, 5, 10, 15, 20];

    const {districts, storecards, districtcards} = this.props;
    const that = this;

    if (this.map) {
      this.map.getSource('districts').setData(districts);
    }

    return (
      <div>

        <Row>
          <Col>

            <LucaSideBar right={false} open={true} width={25}>
              <ul>

                {
                  storecards && storecards.map((item, i) =>
                    <li key={i}>
                      <CardLoader card={item}></CardLoader>
                    </li>)
                }


              </ul>
            </LucaSideBar>

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
                    "fill-opacity": {
                      property: 'frequency',
                      stops: [
                        [BREAKS[0], 0],
                        [BREAKS[1], 0.1],
                        [BREAKS[2], 0.2],
                        [BREAKS[3], 0.3],
                        [BREAKS[4], 0.4],
                        [BREAKS[5], 0.6]]
                    },
                    "fill-outline-color": "#ffffff"
                  }
                })

                map.on('click', 'districtfill', function (e) {

                  const {dispatch} = that.props;

                  dispatch({
                    type: 'card/fetchdistrictcards',
                    payload: {'type': 'district', 'district_name': e.features[0].properties.name}
                  });

                });
              }}

              style="mapbox://styles/mapbox/light-v9"
              containerStyle={{
                height: "100vh",
                width: "100vw"
              }}>

              <StoreMarker selected={this.state.selectedStore && this.state.selectedStore.id === 1}
                           onClick={this.markerClick.bind(this)} coordinates={[-0.27179632, 51.5073509]}
                           store={{'id': 1}}/>

              <StoreMarker selected={this.state.selectedStore && this.state.selectedStore.id === 2}
                           onClick={this.markerClick.bind(this)} coordinates={[-0.17563939, 51.55516]}
                           store={{'id': 2}}/>



            </Map>

            <LucaSideBar right={true} open={true} width={25}>
              <ul>

                {
                  districtcards && districtcards.map((item, i) =>
                    <li key={i}>
                      <CardLoader card={item}></CardLoader>
                    </li>)
                }


              </ul>
            </LucaSideBar>


          </Col>


        </Row>


      </div>
    )
  }
}

import React, {Component} from 'react';
import {connect} from 'dva';

import Transition from 'react-motion-ui-pack';
import { Motion, spring } from 'react-motion';
import geojsonExtent from 'geojson-extent';
import { Row, Col, Card, Button } from 'antd';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

import districts from './../../../assets/london.json';

import CardLoader from '../../../components/Cards/CardLoader';
import BattlegroundCardBar from './BattlegroundCardSideBar';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

@connect((namespaces) => {
  return {
    currentUser: namespaces.user.currentUser,
    cards_left: namespaces.battleground.cardllist_left,
    cards_right: namespaces.battleground.cardllist_right
  };
})
export default class extends Component {

  componentWillMount() {
    const {dispatch} = this.props;
    this.setState({leftHandSide : true});

    dispatch({
      type: 'battleground/clear'
    });

  }

  getcards(clickedOnName) {
    const {dispatch, currentUser} = this.props;

    if (this.state.leftHandSide) {
      dispatch({
        type: 'battleground/fetchcards_left',
        payload: {'type': 'district', 'id': clickedOnName, userid: currentUser.userid}
      });
    } else {
      dispatch({
        type: 'battleground/fetchcards_right',
        payload: {'type': 'district', 'id': clickedOnName, userid: currentUser.userid}
      });
    }

  }

  render() {

    let cards_left = [];
    let cards_right = [];

    cards_left  = this.props.cards_left;
    cards_right  = this.props.cards_right;

    console.log(this.props);

    const that = this;
    return (
      <div>

        <Map
          style="mapbox://styles/mapbox/light-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw",
            position: 'absolute',
          }}
          onStyleLoad={(map) => {

            map.addSource('districts', {
              type: 'geojson',
              data: districts,
            });

            map.addLayer({
              id: 'districtfill',
              type: 'fill',
              source: 'districts',
              paint: {
                'fill-color': '#088',
                'fill-opacity': 0.3,
              },
            });

            map.fitBounds(geojsonExtent(districts), {
              padding: 220,
              duration: 0,
            });

            map.on('click', 'districtfill', function (e) {
              that.getcards(e.features[0].properties.name);
              that.setState({leftHandSide :false});
            });
          }}
        >

        </Map>

        <div style={{'position': 'absolute', 'width': '20%'}}>
          <BattlegroundCardBar right={false}>

            {
              cards_left.map((item, i) =>
                (<li key={i}>
                  <CardLoader card={item}></CardLoader>
                </li>))
            }

          </BattlegroundCardBar>

        </div>

        <div style={{'position': 'absolute', 'width': '20%', 'right' : '0px'}}>
          <BattlegroundCardBar right={true}>
            {
              cards_right.map((item, i) =>
                (<li key={i}>
                  <CardLoader card={item}></CardLoader>
                </li>))
            }
          </BattlegroundCardBar>

        </div>

      </div>
    );
  }
}

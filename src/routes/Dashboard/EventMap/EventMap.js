import React, {Component} from 'react';
import {connect} from 'dva';

import Transition from 'react-motion-ui-pack';
import {Motion, spring} from 'react-motion';


import {Row, Col, Card, Button} from 'antd';
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";


import SmallCellFaultCard from '../../../components/Cards/TopLevel/SmallCellFaultCard/SmallCellFaultCard';

import CardShrinker from '../CardShrinker';

import LucaSideBar from '../../../common/LucaSidebar/LucaSidebar';
import EventMarker from '../../../components/Maps/EventMap/EventMarker';
import styles from './EventMap.less';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});


/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {
  return {list: namespaces.card.list};
})
export default class extends Component {

  state = {
    selectedCard: null,
    selectedMarkers: [],
    sidebaropen: false,
  };


  storeClick(clickedonstore) {

    /*if store isnt already in card list, add it to selectedMarkers list*/
    if (undefined === this.state.selectedMarkers.find(x => x.id === clickedonstore.id)) {
      this.setState(previousState => ({
        selectedMarkers: [...previousState.selectedMarkers, clickedonstore],
        sidebaropen: true,
      }));
    }

    /* set the selectedCard so we know how to colour and animate the card*/
    this.setState({selectedCard: clickedonstore.id});
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchalerts',
    });
  }

  componentDidUpdate(preProps, prevState) {
    const {dispatch} = this.props;

    if (prevState.selectedMarkers.length !== this.state.selectedMarkers.length) {

      dispatch({
        type: 'card/fetchalerts',
      });
    }
  }

  render() {

    const {list} = this.props;

    return (
      <div>

        <Map
          style="mapbox://styles/mapbox/light-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>


          <EventMarker
            coordinates={[-0.2116815, 51.5723582]}
            onClick={this.storeClick.bind(this)}
            item={{'id': 1, 'coordinates' : [-0.2116815, 51.5285582]}}/>

          <EventMarker
            coordinates={[-0.2179315, 51.5235182]}
            onClick={this.storeClick.bind(this)}
            item={{'id': 2, 'coordinates' : [-0.2116815, 51.5285582]}}/>



        </Map>



        <LucaSideBar open={this.state.sidebaropen} width={30}>

          <Row>
            <Col>

              <a onClick={ e=> {this.setState({selectedMarkers : [], sidebaropen: false})}}>close</a>

              <Transition
                component="ul"
                className={styles.sidebar}
                enter={{
                  translateY: spring(0, {stiffness: 200, damping: 15})
                }}
                leave={{
                  translateY: 100
                }}
              >
                {this.state.selectedMarkers.map((item, i) =>
                  <li key={i}>

                    <CardShrinker big={200} small={50} key={i} currentItem={item.id === this.state.selectedCard}>
                      <div
                        onClick={(e) => {
                        this.setState({'selectedCard': item.id})
                      }} style={{
                        'height': '100%',
                        'backgroundColor': ((item.id === this.state.selectedCard)) ? 'rgba(0,255,0,0.3)' : 'rgba(0,0,0,0.3)'
                      }}>

                        <div>
                          <SmallCellFaultCard/>
                        </div>

                      </div>
                    </CardShrinker>

                  </li>
                )
                }
              </Transition>
            </Col>
          </Row>


        </LucaSideBar>


      </div>
    );
  }
}

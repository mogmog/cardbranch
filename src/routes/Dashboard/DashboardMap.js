import React, {Component} from 'react';
import {connect} from 'dva';

import Transition from 'react-motion-ui-pack';
import {Motion, spring} from 'react-motion';

import {Row, Col, Button, Card } from 'antd';
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";

import CardShrinker from './CardShrinker';
import LucaSideBar from './../../common/LucaSidebar/LucaSidebar';
import StoreMarker from './../../components/Maps/StoreMap/StoreMarker';
import styles from './DashboardMap.less';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});



/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {
  return {list: namespaces.card.list};
})
export default class extends Component {

  state = {
    selectedMarkers: [],
    sidebaropen: false,
  };


  storeClick(clickedonstore) {

    if (true || undefined === this.state.selectedMarkers.find(x=> x.id === clickedonstore.id)) {
      this.setState(previousState => ({
        selectedMarkers: [...previousState.selectedMarkers, clickedonstore],
      }));

      this.setState({sidebaropen: true});
    }

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

    const { list } = this.props;

    return (
      <div>

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}>


          <StoreMarker
            coordinates={[-0.2116815, 51.5723582]}
            onClick={this.storeClick.bind(this)}
            store={{'id': 1}}/>

          <StoreMarker
            coordinates={[-0.2179315, 51.5235182]}
            onClick={this.storeClick.bind(this)}
            store={{'id': 1}}/>

          <StoreMarker
            coordinates={[-0.2845815, 51.8235582]}
            onClick={this.storeClick.bind(this)}
            store={{'id': 1}}/>

          <StoreMarker
            coordinates={[-0.2148215, 51.5281232]}
            onClick={this.storeClick.bind(this)}
            store={{'id': 1}}/>


          <StoreMarker
            coordinates={[-0.2116815, 51.5285582]}
            onClick={this.storeClick.bind(this)}
            store={{'id': 1}}/>

          <StoreMarker
            coordinates={[-0.2416815, 51.5735582]}
            onClick={this.storeClick.bind(this)}
            store={{'id': 2}}/>

        </Map>

        <LucaSideBar open={this.state.sidebaropen}>

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
                { this.state.selectedMarkers.map((item, i) =>
                  <li key={i}>


                    <CardShrinker key={i} currentItem={i === this.state.selectedMarkers.length -1}>
                        <Card style={{'height' : '100%', 'backgroundColor' : i === this.state.selectedMarkers.length -1 ? 'rgba(0,255,0,0.3)' : 'rgba(0,0,0,0.3)'}}>
                          dfdfd {i}
                        </Card>
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

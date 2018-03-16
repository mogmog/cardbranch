import React, {Component} from 'react';
import {connect} from 'dva';

import Transition from 'react-motion-ui-pack';
import {Motion, spring} from 'react-motion';


import {Row, Col, Card, Button} from 'antd';
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";


import StreetViewCard from '../../../components/Cards/Store/StreetViewCard/StreetViewCard';
import GenderPercentCard from '../../../components/Cards/TopLevel/GenderPercentCard/GenderPercentCard';

import CardShrinker from '../CardShrinker';

import LucaSideBar from '../../../common/LucaSidebar/LucaSidebar';
import StoreMarker from '../../../components/Maps/StoreMap/StoreMarker';
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
    cards : [],
    sidebaropen: false,
  };


  markerClick(marker) {

    const {dispatch} = this.props;

      this.setState(previousState => ({
        selectedMarker: marker,
        sidebaropen: true,
      }));

    dispatch({
      type: 'card/fetchcards',
      payload : {'type' : 'store' , 'store_id' : marker.id  }
    });

  }

  componentDidUpdate(preProps, prevState) {
    const {dispatch} = this.props;

     /* dispatch({
        type: 'card/fetchcards',
        payload : {'type' : 'store' , 'store_id' : 1  }
      });*/
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


          <StoreMarker
            coordinates={[-0.2116815, 51.5723582]}
            onClick={this.markerClick.bind(this)}
            store={{'id': 1, 'coordinates' : [-0.2116815, 51.5285582]}}/>

          <StoreMarker
            coordinates={[-0.2179315, 51.5235182]}
            onClick={this.markerClick.bind(this)}
            store={{'id': 2, 'coordinates' : [-0.2116815, 51.5285582]}}/>

        </Map>



        <LucaSideBar open={this.state.sidebaropen} width={30}>

          <Row>
            <Col>

              <a onClick={ e=> {this.setState({cards : [], sidebaropen: false})}}>close</a>

              {list.length}

              <Transition
                component="ul"
                className={styles.sidebar}
                enter={{
                  opacity: 1,
                  translateY: spring(0, {stiffness: 200, damping: 15})
                }}
                leave={{
                  opacity: spring(0, {stiffness: 200, damping: 15}),
                  translateY: 1000
                }}
              >
                {list.map((item, i) =>
                  <li key={i}>
                    <StreetViewCard item={item}/>
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
import React, {Component} from 'react';
import {connect} from 'dva';

import {Row, Col, Button} from 'antd';
import ReactMapboxGl, {Layer, Feature, Marker} from "react-mapbox-gl";

import StoreMarker from './../../components/Maps/StoreMap/StoreMarker';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

import LucaSideBar from './../../common/LucaSidebar/LucaSidebar';
import LucaGrid from './../../components/Grid/LucaGrid';
import SmallCellFaultCard from '../../components/Cards/TopLevel/SmallCellFaultCard/SmallCellFaultCard';
import GenderPercentCard from '../../components/Cards/TopLevel/GenderPercentCard/GenderPercentCard';
import SVGIconComponent from './SVGIconComponent';

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

    if (undefined === this.state.selectedMarkers.find(x=> x.id === clickedonstore.id)) {
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

        <pre> {JSON.stringify(this.state.selectedMarkers)} </pre>

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "90vh",
            width: "100vw"
          }}>

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

          <Row gutter={24}>
            <Col>
              <a onClick={ e=> {this.setState({selectedMarkers : [], sidebaropen: false})}}><Button>x</Button></a>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col>
              {list.length}
            </Col>
          </Row>


        </LucaSideBar>


      </div>
    );
  }
}

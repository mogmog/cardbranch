import React, {Component} from 'react';
import {connect} from 'dva';

import { Row, Col, Button } from 'antd';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";

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
    cards : [],
    sidebaropen : false,
  };


  closeSidebar() {
    this.setState({sidebaropen: !this.state.sidebaropen});
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchalerts',
    });
  }

  componentDidUpdate(preProps, prevState) {
    const {dispatch} = this.props;

    if (prevState.cards.length !== this.state.cards.length) {
      dispatch({
        type: 'card/fetchalerts',
      });
    }
  }

  render() {

    return (
      <div>

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "90vh",
            width: "100vw"
          }}>

          <Marker
            coordinates={[-0.2416815, 51.5285582]}
            onClick={this.closeSidebar.bind(this)}
            anchor="bottom">
            <img style={{'width': '50px'}} src={require('./../../assets/mapping/markers/3d-house.svg')}/>
          </Marker>

          <Marker
            coordinates={[-0.2412815, 51.5845582]}
            onClick={this.closeSidebar.bind(this)}
            anchor="bottom">
            <img style={{'width': '50px'}} src={require('./../../assets/mapping/markers/3d-house.svg')}/>
          </Marker>

        </Map>

        <LucaSideBar open={this.state.sidebaropen}>

          <Row gutter={24}>
            <Col>
              <a onClick={this.closeSidebar.bind(this)}><Button>x</Button></a>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col>
              
            </Col>
          </Row>


        </LucaSideBar>


      </div>
    );
  }
}

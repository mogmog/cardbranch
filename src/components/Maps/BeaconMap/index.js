import React, { PureComponent, Fragment } from 'react';
import { Map, TileLayer  } from 'react-leaflet';

export default class BeaconMap extends PureComponent {
  state = { };

  render() {

    return (
      <Fragment>

        <Map attributionControl={false} doubleClickZoom={false} ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={13} style={{'height': '100px'}} >
          <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png'/>
        </Map>

      </Fragment>
    );
  }
}

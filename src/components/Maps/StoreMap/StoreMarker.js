import React, {Component} from 'react';
import {Marker} from "react-mapbox-gl";

import styles from './StoreMarker.less';

export default class extends Component {

  render() {

    const { onClick, store, selected, coordinates } = this.props;

    return (
      <Marker
        coordinates={coordinates}
        onClick={e => {
          onClick(store);
        }}
        anchor="bottom">
        {selected ? <img alt="Store" className={styles.storeMarker} src={require('./../../../assets/mapping/markers/3d-house-selected.svg')} /> : <img alt="Store"  className={styles.storeMarker} src={require('./../../../assets/mapping/markers/3d-house.svg')} /> }

      </Marker>
    );
  }
}

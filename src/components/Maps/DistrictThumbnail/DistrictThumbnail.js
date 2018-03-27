import React, {Component} from 'react';
import ReactMapboxGl, {GeoJSONLayer, Layer, Source, Feature, Marker, Popup} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

export default class extends Component {

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    if (this.map) this.map.jumpTo(this.props.geojson.geometry.coordinates[0][0]);
  }

  render() {

    const {geojson} = this.props;


    console.log(geojson);

    return (
      <div>

        <Map

          onStyleLoad={(map) => {
           this.map = map;
          } }

          style="mapbox://styles/mapbox/light-v9"
          zoom={[7]}
          containerStyle={{
            height: "60px",
            width: "140px"
          }}>

          <GeoJSONLayer

            fillPaint={{"fill-color": "blue", "fill-opacity": 0.6}}
            data={{
            "type":"FeatureCollection",
            "features":[ geojson]
          }} />


        </Map>

      </div>
    );
  }
}

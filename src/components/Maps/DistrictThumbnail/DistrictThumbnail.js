import React, {Component} from 'react';
import ReactMapboxGl, {GeoJSONLayer, Layer, Source, Feature, Marker, Popup} from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import geojsonExtent from 'geojson-extent';


const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

export default class extends Component {

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    if (this.map) {

      //this.map.jumpTo(this.props.geojson.geometry.coordinates[0][0]);

    }


  }

  render() {

    const {geojson} = this.props;

    return (
      <div>

        <Map

          onStyleLoad={(map) => {
           this.map = map;

            map.fitBounds(geojsonExtent(this.props.geojson), {
              padding: 10,
              duration: 0
            });

          } }

          style={{
            version: 8,
            sources: {

          },
            layers: [
          {
            id: 'background',
            type: 'background',
            paint: {
            'background-color': 'white'
          }
          }
            ]

          }}
          containerStyle={{
            width : '300px',
            height : '100px'
          }}>

          <GeoJSONLayer

            fillPaint={{"fill-color": "blue", "fill-opacity": 0.1}}
            data={{
            "type":"FeatureCollection",
            "features":[ geojson]
          }} />


        </Map>

      </div>
    );
  }
}

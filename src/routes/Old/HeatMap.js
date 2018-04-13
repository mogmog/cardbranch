import React from 'react';
import {Button, DatePicker } from 'antd';

const { RangePicker, MonthPicker } = DatePicker;


import d3 from 'd3';
import ReactMapboxGl, {Layer, Source, Feature, Marker} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

const data = {
  "type": "FeatureCollection",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
    { "type": "Feature", "properties": { "id": "ak16994521", "mag": 6, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [  -1.257677, 51.752982, 100 ] } },
    { "type": "Feature", "properties": { "id": "ak16994521", "mag": 6, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [  -1.257347, 51.752712, 100 ] } },
    { "type": "Feature", "properties": { "id": "ak16994521", "mag": 6, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [  -1.257217, 51.752222, 100 ] } },
    { "type": "Feature", "properties": { "id": "ak16994521", "mag": 6, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [  -1.257887, 51.752762, 100 ] } },
    { "type": "Feature", "properties": { "id": "ak16994521", "mag": 6, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [  -1.257447, 51.752232, 100 ] } },


  ]
};

export default class HeatMap extends React.Component {

  constructor() {
    super();
    this.timer = null;
    this.state = {hasAddedSource: false};
  }

  panToA() {
    this.map.flyTo({center : [-1.257677, 51.752982]});
  }

  panToB() {
    this.map.flyTo({center : [-1.957677, 50.752982]});
  }


  render() {



    return (
      <div>

        <Button onClick={this.panToA.bind(this)}> West Gate </Button>

        <Button onClick={this.panToB.bind(this)}> Grafton CEntre </Button>

        <RangePicker renderExtraFooter={() => 'extra footer'} />


      <Map
        center={[-1.257677, 51.752982]}
        zoom={[15]}
        onStyleLoad={(map) => {

          this.map = map;
          //let data = this.props.list[0];

          // save full coordinate list for later
          // var coordinates = data.features[0].geometry.coordinates;

          // start by showing just the first coordinate
          // data.features[0].geometry.coordinates = [coordinates[0]];

          map.addSource('earthquakes', {
            "type": "geojson",
            "data": data
          });

          this.setState({'hasAddedSource': true});

        }}
        style="mapbox://styles/mapbox/satellite-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>


        {
          this.state.hasAddedSource &&
          <Layer
            sourceId="earthquakes"
            type= "heatmap"
            sourceId="earthquakes"
            paint={{
              // Increase the heatmap weight based on frequency and property magnitude
              "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                0, 0,
                6, 1
              ],
              // Increase the heatmap color weight weight by zoom level
              // heatmap-intensity is a multiplier on top of heatmap-weight
              "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 1,
                9, 3
              ],
              // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
              // Begin color ramp at 0-stop with a 0-transparancy color
              // to create a blur-like effect.
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(33,102,172,0)",
                0.2, "rgb(103,169,207)",
                0.4, "rgb(209,229,240)",
                0.6, "rgb(253,219,199)",
                0.8, "rgb(239,138,98)",
                1, "rgb(178,24,43)"
              ],
              // Adjust the heatmap radius by zoom level
              "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 2,
                9, 20
              ],
              // Transition from heatmap to circle layer by zoom level
              "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, 1,
                9, 1
              ],
            }}
          />
        }


      </Map>
      </div>
    )
  }
}

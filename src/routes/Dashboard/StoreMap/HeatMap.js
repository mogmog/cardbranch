import React from 'react';
import d3 from 'd3';
import ReactMapboxGl, {Layer, Source, Feature, Marker} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

export default class HeatMap extends React.Component {

  constructor() {
    super();
    this.timer = null;
    this.state = {hasAddedSource: false};
  }

  render() {

    const data = {
      "type": "FeatureCollection",
      "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},
      "features": [
        {
          "type": "Feature",
          "properties": {"id": "hackney", "mag": 5.3},
          "geometry": {"type": "Point", "coordinates": [-0.05233, 51.55893, 0.0]}
        },


        {
          "type": "Feature",
          "properties": {"id": "islington", "mag": 2.3},
          "geometry": {"type": "Point", "coordinates": [-0.10152, 51.52106, 0.0]}
        },


      ]
    };

    return (
      <Map
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
        style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>


        {
          this.state.hasAddedSource &&
          <Layer
            sourceId="earthquakes"
            type="heatmap"
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
                0, 16,
                9, 40
              ],
              // // Transition from heatmap to circle layer by zoom level
              // "heatmap-opacity": [
              //   "interpolate",
              //   ["linear"],
              //   ["zoom"],
              //   7, 1,
              //   9, 0
              // ],
            }}
          />
        }


      </Map>
    )
  }
}

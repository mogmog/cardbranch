import React from 'react';
import ReactDOM from 'react-dom';

import d3 from 'd3';
import ReactMapboxGl, {Layer, Source, Feature, Marker} from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibW9nbW9nIiwiYSI6ImNpZmI2eTZuZTAwNjJ0Y2x4a2g4cDIzZTcifQ.qlITXIamvfVj-NCTtAGylw"
});

export default class LucaMapSVG extends React.Component {

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

          var container = map.getCanvasContainer();
          var svg = d3.select(container).append("svg")

          svg.attr("width", "100%")
              .attr("height", "100%")
              .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
              }))
            .append('circle').attr('cx', 100).attr('cy', 100).attr('r', 50);
            //  .append(ReactDOM.render(this.props.children))


        }}
        style="mapbox://styles/mapbox/light-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>


      </Map>
    )
  }
}

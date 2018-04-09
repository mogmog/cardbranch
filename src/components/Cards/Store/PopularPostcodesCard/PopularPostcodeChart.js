import React from 'react';

import {Chart, Axis, Geom, Coord, Tooltip} from 'bizcharts';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    const { clickBar, data } = this.props;

    const _data = data;

    const ds = new window.DataSet();

    const dv = ds.createView().source(_data);
    dv.source(_data)
      .transform({
        type: 'sort',
        callback(a, b) {
          return a.population - b.population > 0;
        }
      });

    return (

      <Chart height={250}
             data={dv}
             forceFit
             onPlotMove={(e) => {
                      if (clickBar && e.data) clickBar(e.data._origin.postcode);
            }}
             onPlotLeave={(e) => {
              if (clickBar) clickBar();
            }}
      >
        <Coord transpose/>
        <Axis name="postcode" label={{offset: 12}}/>
        <Axis name="population"/>
        <Tooltip />
        <Geom type="interval" position="postcode*population"/>
      </Chart>
    )
  }
}


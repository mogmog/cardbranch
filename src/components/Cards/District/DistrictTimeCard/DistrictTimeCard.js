import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';

import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class extends React.Component {
  constructor() {
    super();
  }

  render() {

    const {data, extra} = this.props;

    const values = data.data;
    const _data = [];
    for (let i = 0; i < values.length; i++) {
      const obj = {};
      obj.value = values[i];
      _data.push(obj);
    }
    const ds = new window.DataSet();
    const dv = ds.createView().source(_data);
    dv.transform({
      type: 'bin.histogram',
      field: 'value',
      binWidth: 2,
      as: ['value', 'count'],
    });
    const cols = {
      value: {
        nice: false,
        min: 0,
        tickInterval: 1
      },
      count: {
        max: 14
      }
    }

    return (
      <Card title={'The most popular time to visit is 6pm'} style={{'height' : '350px'}} extra={extra}>

        <Chart height={200} data={dv} scale={cols} forceFit>
          <Axis name="value" label={{formatter:val => {if ((val %2)) {return val;} return '';}}}/>
          <Axis name="count" />
          <Tooltip inPlot={false} crosshairs={false} position={'top'} />
          <Geom type='interval' position="value*count" />
        </Chart>


      </Card>
    );
  }
}





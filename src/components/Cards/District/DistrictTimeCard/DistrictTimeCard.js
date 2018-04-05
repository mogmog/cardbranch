import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';

import Dashboard from '../../../../common/DC/dashboard';
import Crossfilter from '../../../../common/DC/crossfilter';


import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class extends React.Component {
  constructor() {
    super();
  }

  render() {

    const {data, extra} = this.props;

    const attributes = [
      {
        type     : 'linear',
        name     : 'Age',
        dimension: row => +row.age
      },

      {
        type     : 'ordinal',
        name     : 'Gender',
        dimension: row => row.sex
      },

    ];


    return (
      <Card title={'More males than females'} style={{'height' : '600px'}} extra={extra}>


        <Crossfilter data={data.data} attributes={attributes}>
          <Dashboard />
        </Crossfilter>



        {/*<Chart height={200} data={dv} scale={cols} forceFit>
          <Axis name="value" label={{formatter:val => {if ((val %2)) {return val;} return '';}}}/>
          <Axis name="count" />
          <Tooltip inPlot={false} crosshairs={false} position={'top'} />
          <Geom type='interval' position="value*count" />
        </Chart>*/}


      </Card>
    );
  }
}





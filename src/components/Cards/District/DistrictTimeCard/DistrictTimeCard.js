import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';


import DistrictTimeCrossFilter from './DistrictTimeCrossFilter';


export default class extends React.Component {
  constructor() {
    super();
  }

  render() {

    const {data, extra} = this.props;

    return (
      <Card title={'More males than females'} style={{'height' : '600px'}} extra={extra}>

        <DistrictTimeCrossFilter data={data}/>




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





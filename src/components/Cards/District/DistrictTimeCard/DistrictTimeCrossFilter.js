import React from 'react';

import {
  ChartContainer, RowChart, BubbleChart,
  DataTable, PieChart, DataCount, BarChart, LineChart
} from '../../../../common/DC/components/index';

import * as crossfilter from 'crossfilter2';
import d3 from 'd3';
import dc from 'dc';

import {
  Row,
  Col,
  Card
} from 'antd';

class CrossfilterContext {
  constructor(data) {
    this.data = data;
    this.crossfilter = crossfilter(data);
    this.groupAll = this.crossfilter.groupAll();

    this.gainOrLossDimension = this.crossfilter.dimension(d => d.gender);
    this.gainOrLossGroup = this.gainOrLossDimension.group();

    this.fluctuationDimension = this.crossfilter.dimension(d => d.age);
    this.fluctuationGroup = this.fluctuationDimension.group();
  }
}

export default class extends React.Component {

  constructor(props) {
    super(props);
  }

  crossfilterContext = (callback) => {
    if (!callback) {
      return this._crossfilterContext;
    }

    this._crossfilterContext = new CrossfilterContext(this.props.data);
    callback(this._crossfilterContext);
  };

  render() {
    return (

      <div>

          <ChartContainer className="container" crossfilterContext={this.crossfilterContext}>

            <Row>
              <Col>

                <div style={{'height': '200px'}}>

                  { <BarChart
                    dimension={ctx => ctx.fluctuationDimension}
                    group={ctx => ctx.fluctuationGroup}
                    width={180}
                    height={180}
                    elasticY={true}
                    centerBar={true}
                    gap={1}
                    alwaysUseRounding={true}
                    x={d3.scale.ordinal().domain([1, 5])}
                    renderHorizontalGridLines={false}
                  />
                  }
                </div>
              </Col>
            </Row>

            <Row>
              <Col>

                <div style={{'height': '200px'}}>

                  <PieChart
                    dimension={ctx => ctx.gainOrLossDimension}
                    group={ctx => ctx.gainOrLossGroup}
                    width={180} height={180}
                    radius={80}
                    label={(d) => {
                      let percent =  (d.value / this.crossfilterContext().groupAll.value() * 100);
                      return `${d.key} (${percent}%)`;
                    }}
                  />


                </div>

              </Col>
            </Row>

          </ChartContainer>



      </div>


    );
  }
}

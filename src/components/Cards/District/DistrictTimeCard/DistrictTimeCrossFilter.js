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
  Card,
  Button
} from 'antd';

class CrossfilterContext {

  constructor(data) {

    this.json = data.map(function (c) {
      c.date = d3.time.format.iso.parse(c.date);
      return c;
    });

    this.data = crossfilter(this.json);

    this.days = this.data.dimension(d => d.date);

    this.minDate = this.days.bottom(1)[0].date;
    this.maxDate = this.days.top(1)[0].date;

    this.lineValues = this.days.group().reduce(function (acc, cur) {
      acc[cur.line] = (acc[cur.line] || 0) + 1
      return acc;
    }, function (acc, cur) {
      acc[cur.line] = (acc[cur.line] || 0) - 1
      return acc;
    }, function () {
      return {};
    });

    this.categories = this.data.dimension(d => d.line);

    /*need a second dimension in order for filters to work - http://blog.rusty.io/2012/09/17/crossfilter-tutorial/*/
    this.categories2 = this.data.dimension(d => d.line);
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

  testFilter() {
    this._crossfilterContext.categories2.filter('completed');
    dc.redrawAll();
  }

  testFilter2() {
    this._crossfilterContext.categories2.filter('assigned');
    dc.redrawAll();
  }

  testFilter3() {
    this._crossfilterContext.categories2.filterAll();
    dc.redrawAll();
  }

  render() {

    var colorScale = ['#719bce', '#7a51ef', '#b768e7', '#f3458a', '#f9513f', '#feba3f', '#ffdf33', '#23b20d', '#0ba368', '#28b9aa'];

    return (

      <div>

        <ChartContainer className="container" crossfilterContext={this.crossfilterContext}>

          <Row>
            <Col>

              <div style={{'height': '200px'}}>

                <LineChart
                  dimension={ctx => ctx.days}
                  group={ctx => [ctx.lineValues, 'completed']}
                  stack={ctx => [ctx.lineValues, 'assigned', (d) => { return d.value.assigned || 0; }]}
                  valueAccessor={d => d.value.completed || 0}
                  turnOnControls={true}
                  width={340}
                  height={180}
                  elasticY={true}
                  brushOn={false}
                  renderArea={true}
                  x={d3.time.scale().domain([new Date('19 May 2016'), new Date('1 June 2016')])}
                  ordinalColors={colorScale}
                />

              </div>
            </Col>
          </Row>

        </ChartContainer>


      </div>


    );
  }
}

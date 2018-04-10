import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dc from 'dc';
import { Base } from './Base';


class BarChart extends Component {
  static propTypes = {
    elasticY: PropTypes.bool,
    centerBar: PropTypes.bool,
    gap: PropTypes.number,
    round: PropTypes.func,
    alwaysUseRounding: PropTypes.bool,
    x: PropTypes.func,
    renderHorizontalGridLines: PropTypes.bool,
    filterPrinter: PropTypes.func
  };

  componentDidUpdate (prevProps) {
    this.chart.redraw();
  }

  loadChart = (container) => {
    if (!container) return;
    this.chart = dc.barChart(container);
    const helper = this.props.chartHelper(this, this.chart);
    helper.setProperties('elasticY', 'centerBar', 'gap', 'round',
                         'alwaysUseRounding', 'x', 'renderHorizontalGridLines',
                         'filterPrinter');

    this.chart.render();
  };

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(BarChart);

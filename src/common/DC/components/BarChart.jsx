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

  loadChart = (container) => {
    if (!container) return;
    const chart = dc.barChart(container);
    const helper = this.props.chartHelper(this, chart);
    helper.setProperties('elasticY', 'centerBar', 'gap', 'round',
                         'alwaysUseRounding', 'x', 'renderHorizontalGridLines',
                         'filterPrinter');

    chart.render();
  };

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(BarChart);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dc from 'dc';
import { Base } from './Base';


class RowChart extends Component {
  static propTypes = {
    elasticX: PropTypes.bool,
    xAxis: PropTypes.func
  };

  loadChart = (container) => {
    if (!container) return;
    const chart = dc.rowChart(container);
    const helper = this.props.chartHelper(this, chart);
    helper.setProperties('elasticX');

    if (this.props.xAxis) {
      this.props.xAxis(chart.xAxis());
    }
    chart.render();
  };

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(RowChart);

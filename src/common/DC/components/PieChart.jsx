import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dc from 'dc';
import { Base } from './Base';

class PieChart extends Component {

  static propTypes = {
    radius: PropTypes.number.isRequired,
    innerRadius: PropTypes.number,
  };

  loadChart = (container) => {
    if (!container) return;
    this.chart = dc.pieChart(container);
    const helper = this.props.chartHelper(this, this.chart);
    helper.setProperties('radius', 'innerRadius');

    this.chart.render();
  };

  render() {
    return <div className={this.props.className} ref={this.loadChart} />;
  }
}

export default Base(PieChart);

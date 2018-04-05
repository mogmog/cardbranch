import React, { Component } from 'react';
import {style} from './style.js';
import AttributeExplorer from '../attributeExplorer';

class Dashboard extends Component {
  render() {

    const {cf} = this.props;
    const dimensionBlock = [];
    for (let dimension in cf.dimensions) {
      dimensionBlock.push(this.renderDimension(dimension));
    }

    return (
      <div style={style.base}>
        {dimensionBlock}
      </div>
    );
  }

  renderDimension(dimension) {
    const {actions, cf} = this.props;
    return (

        <AttributeExplorer key={dimension}
                           name={dimension}
                           type={cf.dimensionTypes[dimension]}
                           dimension={cf.dimensions[dimension]}
                           group={cf.groups[dimension]}
                           onFilter={cf.onFilter}/>

    )
  }
}

export default Dashboard;

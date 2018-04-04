import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NumericDistribution from '../plotting/numericDistribution';
import OrdinalDistribution from '../plotting/ordinalDistribution';

class AttributeExplorer extends Component {
  constructor() {
    super();
    this.state = {
      width : null,
      filter: []
    }
  }

  render() {
    return (
      <div ref="content" style={{width: '100%', height : '200px'}}>
        {this.renderVisualization()}
      </div>
    );
  }

  renderVisualization() {
    const {type, group} = this.props;
    const {width} = this.state;

    if (width === null) {
      return null;
    }


    let configuration = {};
    switch (type) {
      case 'linear':
        configuration = {
          margin: {top: 5, right: 5, bottom: 25, left: 50},
          axes  : {
            x: {
              show: true,
              min : 0,
              max : d3.max(this.props.group.all().map(d => d.key))
            },
            y: {
              show: true,
              min : 0,
              max : this.props.group.top(1)[0].value
            }
          },
          series: {
            data     : group.all(),
            xAccessor: d => d.key,
            yAccessor: d => d.value
          }
        };

        return (
          <NumericDistribution
            {...this.props}
            onBrush={this.handleFilter.bind(this)}
            width={width}
            config={configuration}/>
        );

      case 'ordinal':
        configuration = {
          margin: {top: 20, right: 5, bottom: 5, left: 50},
          axes  : {
            x: {
              show: true,
              min : 0,
              max : this.props.group.top(1)[0].value
            },
            y: {
              show  : true,
              domain: this.props.group.all().map(d => d.key)
            }
          },
          series: {
            data     : group.all(),
            xAccessor: d => d.value,
            yAccessor: d => d.key
          }
        };

        return (
          <OrdinalDistribution
            {...this.props}
            onClick={this.handleFilter.bind(this)}
            currentFilter={this.state.filter}
            width={width}
            height={group.size()*50}
            config={configuration}/>
        );
    }
  }

  handleFilter(data) {
    const {type, onFilter} = this.props;
    onFilter(data);

    switch (type) {
      case 'ordinal':
        this.setState({filter: data.values});
        break;
    }
  }

  componentDidMount() {
    this.setState({width: ReactDOM.findDOMNode(this.refs.content).offsetWidth});
  }


}

export default AttributeExplorer;

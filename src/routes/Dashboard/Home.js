import React, {Component} from 'react';
import {connect} from 'dva';

import LucaGrid from './../../components/Grid/LucaGrid';
import SmallCellFaultCard from '../../components/Cards/TopLevel/SmallCellFaultCard/SmallCellFaultCard';
import GenderPercentCard from '../../components/Cards/TopLevel/GenderPercentCard/GenderPercentCard';

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {
  return {list: namespaces.card.list};
})
export default class Home extends Component {

  state = {
    responsive: true,
    duration: 700,
    stiffness: 100,
    damping: 14,
    columns: 3,
    gutters: 5,
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'card/fetchalerts',
    });
  }

  render() {

    const {data, ...gridProps} = this.state;

    return (
      <div>

        <LucaGrid
          itemHeight={300}
          measured
          {...gridProps}
        >
          <li style={{'width' : '250px'}} key={1}><GenderPercentCard/></li>

          {/*<li key={2}><GenderPercentCard/></li>
          <li key={3}><GenderPercentCard/></li>*/}
        </LucaGrid>

      </div>
    );
  }
}

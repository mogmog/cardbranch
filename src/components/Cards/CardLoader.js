import React, {Component} from 'react';

/*This should probaly be dynamic but had big problems with webpack. if its only a few card then maybe it doesnt matter*/

import StreetViewCard from './Store/StreetViewCard/StreetViewCard';
import GenderPercentCard from './TopLevel/GenderPercentCard/GenderPercentCard';

export default class extends Component {

  constructor(props) {
    super();
  }

  render() {

    /*must update this every time ytou add a new card*/
    const mappings = {
      'StreetViewCard' : StreetViewCard,
      'GenderPercentCard' : GenderPercentCard
    }

    const { card } = this.props;

    let Card = mappings[card.component];

    return (
      <Card data={card.data }/>
    );
  }
}

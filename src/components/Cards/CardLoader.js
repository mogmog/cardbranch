import React, {Component} from 'react';

/*This should probaly be dynamic but had big problems with webpack. if its only a few card then maybe it doesnt matter*/

import StreetViewCard from './Store/StreetViewCard/StreetViewCard';
import GenderPercentCard from './TopLevel/GenderPercentCard/GenderPercentCard';

import DistrictInfoCard from './District/DistrictInfoCard/DistrictInfoCard';
import MostSimilarDistrictCard from './District/MostSimilarDistrictCard/MostSimilarDistrictCard';

import DistrictTimeCard from './District/DistrictTimeCard/DistrictTimeCard';

export default class extends Component {

  constructor(props) {
    super();
  }

  render() {

    /*must update this every time ytou add a new card*/
    const mappings = {
      'StreetViewCard' : StreetViewCard,
      'GenderPercentCard' : GenderPercentCard,
      'DistrictInfoCard' : DistrictInfoCard,
      'MostSimilarDistrictCard' : MostSimilarDistrictCard,
      'DistrictTimeCard' : DistrictTimeCard
    }

    const { card } = this.props;

    let Card = mappings[card.component];

    return (
      <Card data={card.data }/>
    );
  }
}

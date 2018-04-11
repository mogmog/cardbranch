import React, {Component} from 'react';
import {Button, Menu, Dropdown, Icon} from 'antd';
/*This should probaly be dynamic but had big problems with webpack. if its only a few card then maybe it doesnt matter*/

import StreetViewCard from './Store/StreetViewCard/StreetViewCard';
import PopularPostcodesCard from './Store/PopularPostcodesCard/PopularPostcodesCard';

import GenderPercentCard from './TopLevel/GenderPercentCard/GenderPercentCard';

import DistrictInfoCard from './District/DistrictInfoCard/DistrictInfoCard';
import MostSimilarDistrictCard from './District/MostSimilarDistrictCard/MostSimilarDistrictCard';

import DistrictTimeCard from './District/DistrictTimeCard/DistrictTimeCard';

export default class extends Component {

  constructor(props) {
    super();
  }

  render() {

    /*must update this every time you add a new card*/
    const mappings = {
      'StoreStreetViewCard' : StreetViewCard,
      'StoreGenderPercentCard' : GenderPercentCard,
      'StorePopularPostcodesCard' : PopularPostcodesCard,
      'DistrictInfoCard' : DistrictInfoCard,
      'DistrictMostSimilarCard' : MostSimilarDistrictCard,
      'DistrictTimeCard' : DistrictTimeCard,

    }

    const { card, extra } = this.props;

    const Card = mappings[card.component];

    if (!Card) return (<span> no card defined</span>);

    return (
      <div>
        <Card extra={extra} data={card.data }/>
      </div>
    );
  }
}

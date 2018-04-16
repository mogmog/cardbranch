import React from 'react';
import { Icon } from 'antd';
import {connect} from "dva";

@connect((namespaces) => {
  return {
    favourite: namespaces.favourite,
    currentUser: namespaces.user.currentUser,
  };
})

export default class FavouritesWrapper extends React.Component {
  constructor() {
    super();
  }

  addFavourite() {
    const {  card, favourite, dispatch, currentUser } = this.props;
    console.log(favourite);

    dispatch({
      type: 'favourite/add',
      payload: {'userId': currentUser.userid, 'cardId' : card.id}
    });

  }

  render() {

    const { children, card } = this.props;

    return (
      <div>
        <div><Icon onClick={this.addFavourite.bind(this)} type="heart" /></div>

        {children}
      </div>
    )
  }
}


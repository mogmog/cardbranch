import React from 'react';
import { Icon } from 'antd';
import {connect} from "dva";
import {Motion, spring} from 'react-motion';

@connect((namespaces) => {
  return {
    favourite: namespaces.favourite,
    currentUser: namespaces.user.currentUser,
  };
})

export default class FavouritesWrapper extends React.Component {
  constructor() {
    super();
    this.state = {open: false};
  }

  addFavourite() {
    const {  card, favourite, dispatch, currentUser } = this.props;
    this.setState({open : true});

    dispatch({
      type: 'favourite/add',
      payload: {'userId': currentUser.userid, 'cardId' : card.id}
    });

  }

  render() {

    const { children, card } = this.props;
    const {open} = this.state;

    return (
      <div>
        <div>
          <span style={{position: 'absolute', 'color' : 'red','margin-top' : `0%`}}>
          <Icon onClick={this.addFavourite.bind(this)} type="heart" />
          </span>

          <Motion style={{offset: spring(open ? -5 : 0), opacity: spring(open ? 0 : 1)}}>
            {
              ({ offset, opacity }) => (
                <span style={{'opacity' : opacity, 'color' : open ? 'red' : 'grey', position: 'absolute', 'margin-top' : offset+`%`}}>
                <Icon onClick={this.addFavourite.bind(this)} type="heart" />
                </span>
              )}
          </Motion>

        </div>

        {children}
      </div>
    )
  }
}


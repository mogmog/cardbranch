import React, {Component} from 'react';
import {connect} from 'dva';
import { Icon } from 'antd';
import LucaGrid from './../../../components/Grid/LucaGrid';
import CardLoader from '../../../components/Cards/CardLoader';

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {

  return {
    storecardlist: namespaces.card.storecardlist,
    currentUser: namespaces.user.currentUser,
  };

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
    const {dispatch, currentUser } = this.props;

    /*for testing purposes, we just get cards for a store. This would actually be replaceds with some kind of 'my cards dashboard'  that contextually returns cards of interest*/
    dispatch({
      type: 'card/fetchstorecards',
      payload: {'type': 'store', 'id': '1', userid: currentUser.userid }
    });

  }

  render() {

    const {storecardlist} = this.props;
    const {...gridProps} = this.state;


    const newstore = (<span>
                           <Icon type="star"/> new store!
                      </span>);

    /*context specifc buttons for particular cards - hacked this in for demo purposes*/
    const extras = {
      'StoreStreetViewCard': newstore,
    };


    return (
      <div>



        <LucaGrid
          itemHeight={300}
          measured
          {...gridProps}
        >

          {storecardlist.map((card, i) =>
            (<li style={{'width': '400px'}} key={i}>
              <CardLoader extra={extras[card.component] || <span></span>} card={card}></CardLoader>
            </li>)
          )}

        </LucaGrid>

      </div>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from '../../components/Login';
import CardLoader from '../../components/Cards/CardLoader';
import styles from './Email.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {

  //console.log(namespaces);

  return {
    cards: namespaces.email.cards,
  };
})
export default class EmailPage extends Component {
  state = {
    id : null
  }

  componentWillMount() {

    const {dispatch, currentUser, match} = this.props;
    this.setState({id : match.params.id} );

    dispatch({
      type: 'email/fetchcards',
      payload: {'id': match.params.id}
    });

  }

  componentDidUpdate(prevprops, prevstate) {
    const {dispatch, currentUser, match, cards} = this.props;

    console.log(match.params.id, prevstate.id);

    if (match.params.id !== prevstate.id) {

      this.setState({id : match.params.id} );
      dispatch({
        type: 'email/fetchcards',
        payload: {'id': match.params.id}
      });
    }

  }

  render() {

    return (
      <div className={styles.main}>

        <h1> Graham thought you might like to see the following card</h1>

        {this.props.cards.length && <CardLoader card={this.props.cards[0]}></CardLoader> }

      </div>
    );
  }
}

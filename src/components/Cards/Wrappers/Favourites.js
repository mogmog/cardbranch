import React from 'react';
import { Modal, Icon, Input } from 'antd';
import {connect} from "dva";
import {Motion, spring} from 'react-motion';
import CardLoader from '../../../components/Cards/CardLoader';
import html2canvas from 'html2canvas';

@connect((namespaces) => {
  return {
    favourite: namespaces.favourite,
    currentUser: namespaces.user.currentUser,
  };
})

export default class FavouritesWrapper extends React.Component {
  constructor() {
    super();
    this.state = {open: false, sendEmailModalVisible : false, email : 'graham.bates@telefonica.com'};
  }

  sendEmail() {
    this.setState({sendEmailModalVisible : true});
  }

  handleOk() {

    const {  card , dispatch } = this.props;

    html2canvas(document.querySelector( ".sendEmailHolder" )).then(canvas => {
      dispatch({
        type: 'email/send',
        payload: { email : 'graham.bates@telefonica.com', id : card.id, image : canvas.toDataURL() },
      });
    });


  }

  handleCancel() {
    this.setState({sendEmailModalVisible : false});
  }

  addFavourite() {
    const {  card, favourite, dispatch, currentUser } = this.props;
    this.setState({open : true});

    dispatch({
      type: 'favourite/add',
      payload: {'userId': currentUser.userid, 'cardId' : card.id, image : 'sdsd'}
    });

  }

  render() {

    const { children, card } = this.props;
    const {open, sendEmailModalVisible} = this.state;

    return (
      <div>

        <Modal
          visible={sendEmailModalVisible}
          width={1000}
          bodyStyle={{'height' : '60vh' }}
          title="Send this card to a contact"
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >

          <div className="sendEmailHolder">
            <CardLoader card={card}></CardLoader>
          </div>

          <Input placeholder="Send to" value={this.state.email} />

        </Modal>

        <div>

          <Icon onClick={this.sendEmail.bind(this)} type="contacts" />

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


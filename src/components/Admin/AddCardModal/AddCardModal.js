import React from 'react';
import {
  Row,
  Col,
  Card,
  Modal
} from 'antd';
import {connect} from "dva";


/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {

  return {
    cardmappings : namespaces.admin.cardmappings,
  };
})

export default class extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {

    const {dispatch} = this.props;

    dispatch({
      type: 'admin/fetchcardmappings',
    });
  }

  handleOk() {
   window.location.reload();
  }

  handleCancel() {
    alert("cancel");
  }

  render() {

    const { cardmappings } = this.props;

    return (
      <Modal
        visible={true}
        width={500}
        bodyStyle={{'height' : '60vh' }}
        title="Change cards on this page"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >

        <pre>
          {JSON.stringify(cardmappings)}
        </pre>

      </Modal>
    );
  }
}





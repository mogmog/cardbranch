import React from 'react';
import {
  Row,
  Col,
  Card,
  Modal,
  Table,
  Icon,
  Divider,
  Switch
} from 'antd';

const { Column, ColumnGroup } = Table;

import {connect} from "dva";


/*when the api calls have finished, put the results into the props */
@connect((namespaces) => {

  return {
    cardmappings : namespaces.admin.cardmappings,
    currentUser: namespaces.user.currentUser,
  };
})

export default class extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {

    const {dispatch, currentUser} = this.props;

    dispatch({
      type: 'admin/fetchcardmappings',
      payload : {userId : currentUser.userid}
    });
  }

  handleOk() {
   window.location.reload();
  }

  handleCancel() {
    alert("cancel");
  }

  onChange(event, mapping) {

    const {dispatch} = this.props;

    mapping.enabled = event ? 'Y' : 'N';

    dispatch({
      type: 'admin/updatecardmapping',
      payload : mapping
    });

    //alert(`switch to ${checked.id}`);
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

        <Table dataSource={cardmappings} pagination={false} >

          <Column
            title="Key"
            dataIndex="component"
            key="component"
          />
          <Column
            title="Action"
            key="action"
            render={(mapping) => (
              <span>
                  <Switch checked={mapping.enabled === 'Y'} onChange={(e) => {this.onChange(e, mapping)}} />
              </span>
            )}
          />
        </Table>

      </Modal>
    );
  }
}





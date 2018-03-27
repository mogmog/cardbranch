import React from 'react';

import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Modal,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      visible : false,
      isFlipped: false
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({isFlipped: !this.state.isFlipped});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 300);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }


  render() {

    const {visible} = this.state;
    const {data} = this.props;
    const loading = false;

    return (

      <div>

        <div>

          <Card title={`The most similar district is ${data.name}`}>
            <a onClick={this.showModal.bind(this)}>
              How did we measure this
            </a>

          </Card>

        </div>


        <Modal
          visible={visible}
          width={1000}
          bodyStyle={{'height' : '60vh' }}
          title="Details"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <p>Similar Income</p>
          <p>Similar time to central london</p>
          <p>Similar demographics</p>
        </Modal>

      </div>
    )
  }
}


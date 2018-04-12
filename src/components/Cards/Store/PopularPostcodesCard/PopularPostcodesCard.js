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
  Menu,
  Dropdown,
} from 'antd';

import ReactCardFlip from 'react-card-flip';
import PopularPostcodeChart from './PopularPostcodeChart';
import PopularPostcodeMap from './PopularPostcodeMap';

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      isFlipped: false,
      postcode: null
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({isFlipped: !this.state.isFlipped});
  }

  updatePostcode(postcode) {
    this.setState({postcode : postcode});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  render() {

    const { data } = this.props;
    const {visible, postcode} = this.state;

    return (

      <div style={{'height' : '328px'}}>

        <ReactCardFlip isFlipped={this.state.isFlipped} >

          <div key="front">
            <Card>

              <div style={{'width' : '250px'}}>
                <PopularPostcodeChart data={data}/>
              </div>

              <button type="primary" onClick={this.showModal.bind(this)}>
                Modal
              </button>

            </Card>
          </div>

          <div key="back">
           <Card>
             back
                <pre>
                 {/* {JSON.stringify(data)}*/}
                </pre>
           </Card>
          </div>


        </ReactCardFlip>

        <Modal
          visible={visible}
          width={1000}
          bodyStyle={{'height' : '60vh' }}
          title="Somethinh to do with graphs"
          onCancel={this.handleCancel}
          footer={[]}
        >

          <Row>

            <Col span={8}>
              <div style={{'width' : '350px'}}>
              <PopularPostcodeChart data={data} clickBar={this.updatePostcode.bind(this)} />
              </div>
            </Col>

            <Col span={14} push={2}>
              <PopularPostcodeMap visible={visible} postcodeToHighlight={postcode}/>
            </Col>
          </Row>

        </Modal>

      </div>
    )
  }
}


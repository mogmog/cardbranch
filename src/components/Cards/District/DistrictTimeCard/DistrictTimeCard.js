import React from 'react';
import DistrictTimeCrossFilter from './DistrictTimeCrossFilter';
import DistrictTimeCrossFilterModal from './DistrictTimeCrossFilterModal';

import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Modal,
  Table,
  Button,
  Radio,
  DatePicker,
  Menu,
  Dropdown,
} from 'antd';

import ReactCardFlip from 'react-card-flip';

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

      <div style={{'height' : '340px'}}>

        <ReactCardFlip isFlipped={this.state.isFlipped} >

          <div key="front">
            <Card title={'Visits per month'}>

              <div style={{'width' : '250px'}}>
                <DistrictTimeCrossFilter brush={false} data={data}/>
              </div>

              <Button type="primary" onClick={this.showModal.bind(this)}>
                View visits
              </Button>

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
          title="Blah"
          onCancel={this.handleCancel}
          footer={[]}
        >

          <Row>
            <Col span={24}>
              <DistrictTimeCrossFilterModal data={data}/>
            </Col>
          </Row>

        </Modal>

      </div>
    )
  }
}





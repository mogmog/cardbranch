import React from 'react';
import {
  Row,
  Col,
  Card,
  Modal
} from 'antd';

import {addLocaleData, injectIntl, FormattedMessage } from 'react-intl';
import localeData from './translations';

import LucaCard from '../../LucaCard';
import WarningIcon from './../../../Icons/WarningIcon/WarningIcon';

const schema        = require('json-loader!./schema.json');
const sample        = require('json-loader!./sample.json');



export default class extends React.Component {
  constructor() {
    super();

    this.schema = schema;
    this.sample = sample;

    this.state = {
      visible : false,
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
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  _getFront(data) {

    return (
      <div>

        <Row>

          <Col span={24}>
            <FormattedMessage id='warning' defaultMessage='{warning}' values={localeData} />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <WarningIcon></WarningIcon>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <a onClick={(e) => this.showModal()}>More info</a>
          </Col>
        </Row>

      </div>
    );
  }

  render() {

    const {data = sample} = this.props;
    const { visible } = this.state;

    return (
      <div>

        <div>

          <Card>
            {this._getFront(data)}
          </Card>

          <Modal
            visible={visible}
            width={1000}
            bodyStyle={{'height' : '60vh' }}
            title="Event"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[]}
          >
            <p>Diagnostics.....</p>

          </Modal>

        </div>

      </div>
    );
  }
}


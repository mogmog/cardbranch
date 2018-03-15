import React from 'react';
import {
  Row,
  Col,
  Card
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

    this.state = {};
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

      </div>
    );
  }

  render() {

    const {data = sample} = this.props;

    return (
      <Card>
        {this._getFront(data)}
      </Card>
    );
  }
}


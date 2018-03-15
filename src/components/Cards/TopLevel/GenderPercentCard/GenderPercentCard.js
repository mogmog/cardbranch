import React from 'react';
import {
  Row,
  Col,
  Card
} from 'antd';

import {addLocaleData, injectIntl, FormattedMessage } from 'react-intl';
import localeData from './translations';

import PercentHeadlineWithIcon from './../../Widgets/PercentHeadlineWithIcon/PercentHeadlineWithIcon';
import LucaCard from '../../LucaCard';
import GenderIcon from './../../../Icons/GenderIcon/GenderIcon';

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
          <Col span={12} offset={12}>

            <PercentHeadlineWithIcon
              zoom={0.7}
              amount={5822}
              total={12000}
              change={<FormattedMessage id='increase' defaultMessage='{increase}' values={localeData} />}
              label={<FormattedMessage id='male' defaultMessage='{male}' values={localeData} />}
              domain={<FormattedMessage id='domain' defaultMessage='{domain}' values={localeData} />}
              icon={<GenderIcon width={80} gender={'male'}/>} />
          </Col>
        </Row>

        <Row>
          <Col span={12} offset={12}>
            &nbsp;
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <PercentHeadlineWithIcon
              zoom={1}
              amount={5822}
              total={12000}
              change={<FormattedMessage id='decrease' defaultMessage='{decrease}' values={localeData} />}
              label={<FormattedMessage id='female' defaultMessage='{female}'  values={localeData} />}
              domain={<FormattedMessage id='domain' defaultMessage='{domain}' values={localeData} />}
              icon={<GenderIcon width={80} selected gender={'female'}/>} />
          </Col>
        </Row>

      </div>
    );
  }

  render() {

    const {item, data = this.sample } = this.props;

    return (
      <Card style={{'height' : '100%', 'overflow': 'hidden', 'backgroundColor' : 'rgba(255,255,255,1)'}}>
        {this._getFront(data)}
      </Card>
    )
  }
}


import React from "react";
import { Row, Col, Badge } from 'antd';
import FlagAvatar from './../../Flags';

export default class Headline extends React.Component {

  static sampledata = {headline : "Headline", subheadline : "Subheadline", uk : true};

  static schema = {

    uk : {
      type : "boolean"
    },

    headline : {
      type : "string"
    },

    subheadline : {
      type : "string"
    }

  }

  render() {

    this.state = this.props.formData;
    if (Object.keys(this.state).length === 0) this.state = Headline.sampledata;

    return (
      <div>

        <Row>
          <Col span={15}>
            <h1>
              {this.state.headline}
            </h1>

            <h3>
              {this.state.subheadline}
            </h3>


          </Col>

          <Col span={4}>

            {this.state.uk && <FlagAvatar flagurl={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/320px-Flag_of_the_United_Kingdom_%283-5%29.svg.png'}/>}
            {!this.state.uk && <FlagAvatar flagurl={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/640px-Flag_of_Europe.svg.png'}/>}

          </Col>

        </Row>

      </div>
    );
  }
}

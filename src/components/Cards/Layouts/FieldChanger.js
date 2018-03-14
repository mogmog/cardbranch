import React from "react";
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Select,
  Input,
  Divider,
  Progress,
  Button,
  Icon,
  Badge,
  Dropdown,
  Menu,
  Avatar,
  Modal
} from 'antd';

const RadioGroup = Radio.Group;

export default class FieldChanger extends React.Component {

  state = {value: 1};
  key = this.props._key;

  shouldComponentUpdate() {
    return true;
  }

  handleChange = (e) => {
    if (e.target.value == 1) this.props.updateSchema(this.key, 'Thing');
    if (e.target.value == 2) this.props.updateSchema(this.key, 'Extra');
    if (e.target.value == 3) this.props.updateSchema(this.key, 'Headline');
  }

  render() {

    return (
      <div>

        <RadioGroup onChange={this.handleChange}>
          <Radio value={1}>Thing</Radio>
          <Radio value={2}>Extra</Radio>
          <Radio value={3}>Headline</Radio>
        </RadioGroup>

      </div>
    )
  }
}

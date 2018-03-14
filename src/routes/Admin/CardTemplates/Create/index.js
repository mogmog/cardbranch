import React, {PureComponent} from 'react';
import {connect} from 'dva';
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
import ReactTooltip from 'react-tooltip'

import Form from "react-jsonschema-form";

const RadioGroup = Radio.Group;

import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';

//import Standard from '../../../../components/Cards/Layouts/Standard';

import LucaCard from '../../../../components/Cards/LucaCard';

import CircleOnMap from '../../../../components/Cards/Fields/CircleOnMap';
import Thing from '../../../../components/Cards/Fields/Thing';
import Headline from '../../../../components/Cards/Fields/Headline';

class FieldChanger extends React.Component {

  state = {value: 1};
  key = this.props._key;

  shouldComponentUpdate() {
    return true;
  }

  handleChange = (e) => {
    if (e.target.value === 1) this.props.updateSchema(this.key, 'Thing');
    if (e.target.value === 2) this.props.updateSchema(this.key, 'CircleOnMap');
    if (e.target.value === 3) this.props.updateSchema(this.key, 'Headline');
  }

  render() {

    return (
      <div>

        <RadioGroup onChange={this.handleChange}>
          <Radio value={1}>Badge</Radio>
          <Radio value={2}>CircleOnMap</Radio>
          <Radio value={3}>Headline</Radio>
        </RadioGroup>

      </div>
    )
  }
}

export default class TestCardAdmin extends React.Component {

  that = this;

  state = {
    form: true,
    edit: true,

    data : { 'front' : Headline.sampledata},

    schema: {
      type: "object", properties: {

        front: {
          type: "object",
        },



      }

    },
    uiSchema: {front: {"ui:field": 'CircleOnMap'} }
  };

  toggleEdit = (x) => {
    this.setState({edit: !this.state.edit});
  }

  changeLayoutRow = (x) => {
    this.setState({form: false}, _ =>
      this.setState({form: true, layout: this.ColumnLayout})
    );
  }

  changeLayoutCol = (x) => {
    this.setState({form: false}, _ =>
      this.setState({form: true, layout: this.RowLayout})
    );
  }

  changeLayoutSingle = (x) => {
    this.setState({form: false}, _ =>
      this.setState({form: true, layout: this.getSingleLayout(this.state.edit)})
    );
  }


  createCard = (x) => {
    const url = `curl -H "Content-Type: application/json" -X POST -d '{"wrapper_component" : "Normal", "form" : ${JSON.stringify(this.state)}, "context" : "district"}' http://localhost:5001/api/cardtemplates/create`

    alert("do a curl : " + url);

  }

  _getform = () => {

    const updateSchema = function(key, field) {
      var someProperty = this.state.uiSchema;

      someProperty[key] = {"ui:field": field};

      this.setState({form: false}, () => {
        this.setState({form: true, 'uiSchema': someProperty});
      })
    }

    const ColumnLayout = ({TitleField, properties, title, description}) => {
      const sampledata = [{content: <div>front</div>, key: 1}, {content: <div>second</div>, key: 2}];

      return (
        <div>
          <Row>
            {(properties).map(prop => (
              <Col span={12} key={prop.content.key}>
                <FieldChanger updateSchema={updateSchema.bind(this)} _key={prop.content.key}></FieldChanger>
                {prop.content}
              </Col>
            ))}
          </Row>
        </div>
      );
    }

    const fields = {'Headline': Headline, 'CircleOnMap': CircleOnMap, 'Thing': Thing};

    return (
      <Form
        ObjectFieldTemplate={ColumnLayout}
        schema={this.state.schema}
        uiSchema={this.state.uiSchema}
        fields={fields}
        formData={this.state.data}
      >

        <button type="submit" style={{'display': 'none'}}>Submit</button>

      </Form>
    );
  }

  render() {

    const fields = {'Headline': Headline, 'CircleOnMap': CircleOnMap, 'Thing': Thing};
    return (
      <PageHeaderLayout>
        <div>

          <Row>
            <Col span={16}>
              <Button onClick={this.changeLayoutSingle.bind(this)}>Single layout</Button>
              <Button onClick={this.changeLayoutCol.bind(this)}>Row layout</Button>
              <Button onClick={this.changeLayoutRow.bind(this)}>Col layout</Button>

              <Button onClick={this.toggleEdit.bind(this)}>Toggle Edit</Button>

            </Col>

            <Col span={4}>
              <Button onClick={this.createCard.bind(this)}>Create Card Template</Button>
            </Col>

          </Row>

          <Row>
            <Col>

              <pre> {JSON.stringify(this.state)} </pre>

              {this.state.form && <LucaCard front={this._getform()}/> }
            </Col>
          </Row>

        </div>


      </PageHeaderLayout>
    );
  }
}

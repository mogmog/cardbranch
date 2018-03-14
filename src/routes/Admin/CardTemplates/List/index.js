import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Icon,
  Button,
  Avatar,
  Modal
} from 'antd';

import Form from "react-jsonschema-form";
import CodeMirror from 'react-codemirror';

require('codemirror/lib/codemirror.css');

import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import LucaCard from '../../../../components/Cards/LucaCard';

import CircleOnMap from '../../../../components/Cards/Fields/CircleOnMap';
import Thing from '../../../../components/Cards/Fields/Thing';
import Headline from '../../../../components/Cards/Fields/Headline';

/*when the aync api calls have finished, push the results into the props of the component*/
@connect((namespaces) => {
  return { list : namespaces.cardtemplate.list };
})

export default class AdminCardTemplateList extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'cardtemplate/fetch',
    });
  }


  state = {
    modalvisible: false,
    modalitem : null,
  };

  showModal(item) {
    this.setState({modalvisible: true, modalitem : item});
  }

  handleOk(e) {
    this.setState({ modalvisible: false, modalitem : null});
  }

  handleCancel(e) {
    this.setState({modalvisible: false, modalitem : null});
  }

  updateCode(newCode) {

    var someProperty = {...this.state.modalitem}

    try {
      someProperty.form.data = JSON.parse(newCode);
      this.setState({modalitem: someProperty});
    } catch (e) {
      //probably just typing
    }
  }

  getNewCardUrl() {
    let obj = {};
    obj.template_id = this.state.modalitem.id;
    obj.wrapper = "Normal";
    obj.key = "Dalston";
    obj.data = this.state.modalitem.form.data;

    return JSON.stringify(obj);
  }


  _getform(modalitem) {

    const fields = {'Headline': Headline, 'CircleOnMap': CircleOnMap, 'Thing': Thing};

    return (
      <Form
        /*ObjectFieldTemplate={(this.state.layout)}*/
        schema={modalitem.form.schema}
        uiSchema={modalitem.form.uiSchema}
        fields={fields}
        formData={modalitem.form.data}
      >

        <button type="submit" style={{'display': 'none'}}>Submit</button>

      </Form>
    );
  }
  render() {


    const {list} = this.props;
    const {modalitem} = this.state;

    const Preview = ({item}) => (
      <span>
          <Button onClick={(x=> { this.showModal(item)})}> Preview <Icon type={'eye'}/> </Button>
      </span>
    );

    return (
      <div>
        <PageHeaderLayout>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={list}
            renderItem={item => (
              <List.Item

                key={item.id}
                actions={[<Preview item={item}/>]}
                extra={<div style={{'zoom' : '0.4', 'height': '400px'}}> <LucaCard height='350px' front={this._getform(item)}/></div>}
              >
                Card template id : {item.id}
              </List.Item>
            )}
          />
        </PageHeaderLayout>

        <Modal
          visible={this.state.modalvisible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
          width={1000}
          bodyStyle={{'height': '60vh'}}
          title="Preview card template"
          footer={[]}
        >

          <Row gutter={16}>
            <Col span={24}>
              {modalitem && <LucaCard height='200px' front={this._getform(modalitem)}/>}
            </Col>

            <Col>

              test

              {modalitem &&
                <div style={{'paddingLeft' : '400px'}}>
                    <CodeMirror value={JSON.stringify(modalitem.form.data)} onChange={this.updateCode.bind(this)} options={{}}/>
                    <h2>To view this *district* card with a district of *Dalston*, you would perform a POST such as the following curl </h2>
                    <pre>curl -H "Content-Type: application/json" -X POST -d '{this.getNewCardUrl()}' http://localhost:5001/api/cards/create</pre>
                </div>
              }
            </Col>

          </Row>

          <Row gutter={16}>

            {/*<Card style={{'height' : '400px'}}>

              {modalitem &&

              <div>
                <CodeMirror value={JSON.stringify(modalitem.form.data)} onChange={this.updateCode.bind(this)} options={{}}/>
                <pre>curl -H "Content-Type: application/json" -X POST -d '{this.getNewCardUrl()}' http://localhost:5001/api/cards/create</pre>
              </div>
              }

            </Card>*/}

          </Row>

        </Modal>

      </div>


    );
  }
}

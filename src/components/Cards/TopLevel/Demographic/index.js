import React from 'react';
import {Spin} from 'antd';
import FlagAvatar from '../../../Flags';

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

import ReactCardFlip from 'react-card-flip';

import styles from './index.less';
import classNames from 'classnames';

import LucaCard from '../../LucaCard';

export default class DemographicCard extends React.Component {
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
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }


  render() {

    const { district, uk=false } = this.props;
    const {visible} = this.state;
    const loading = false;

    return (

      <div>

      {/*<LucaFlipCard
        front={ <h1>Younger women </h1> <h4>from the United Kingdom</h4>}
        back={<Bar height={200} title="Sales" data={[{"x":"A","y":627},{"x":"B","y":872}]} />}
        modal={<div>something</div>}
      >
      </LucaFlipCard>*/}


      <ReactCardFlip isFlipped={this.state.isFlipped} style={{'height' : '200px'}}>

        <div key="front">

          <LucaCard key={1} style={{'height' : '200px'}}>

            <h3>{district} main demographic is </h3>
            <h3>Younger women </h3>

            {uk &&
              <h4>from the United Kingdom
              <FlagAvatar flagurl={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/320px-Flag_of_the_United_Kingdom_%283-5%29.svg.png'}/>
              </h4>
            }

            {!uk &&
            <h4>from the EU
              <FlagAvatar flagurl={'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/640px-Flag_of_Europe.svg.png'}/>
            </h4>
            }


            <button onClick={this.handleClick.bind(this)}>See more</button>

          </LucaCard>
        </div>

        <div key="back">
          <LucaCard key={2} style={{'height' : '200px'}}>

            <div style={{'width' : '100px'}}>
              <Bar height={200} title="Sales" data={[{"x":"A","y":627},{"x":"B","y":872}]} />
            </div>

              <button onClick={this.handleClick.bind(this)}>Back</button>

            <button type="primary" onClick={this.showModal.bind(this)}>
              Open
            </button>

          </LucaCard>
        </div>


      </ReactCardFlip>

        <Modal
          visible={visible}
          width={1000}
          bodyStyle={{'height' : '60vh' }}
          title="Somethinh to do with demographcs"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

      </div>
    )
  }
}


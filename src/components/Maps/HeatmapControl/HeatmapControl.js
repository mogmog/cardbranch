import React, {Component} from 'react';
import styles from './HeatmapControl.less';
import {Card, Radio} from 'antd';

const RadioGroup = Radio.Group;

export default class extends Component {


  render() {

    const {onChange} = this.props;


    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <div className={styles.heatmapcontrol}>
        <div className={styles.box}>
              <Card>
                <RadioGroup onChange={onChange}>
                  <Radio style={radioStyle} value={1}>Show males</Radio>
                  <Radio style={radioStyle} value={2}>Show females</Radio>
                  <Radio style={radioStyle} value={3}>Show something</Radio>
                </RadioGroup>
              </Card>
        </div>
      </div>
    );
  }
}

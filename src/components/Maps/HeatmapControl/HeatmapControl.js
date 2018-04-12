import React, {Component} from 'react';
import styles from './HeatmapControl.less';
import {Card, Checkbox, Slider} from 'antd';

const CheckboxGroup = Checkbox.Group;
export default class extends Component {

  handleDisabledChange = (disabled) => {
    this.setState({ disabled });
  }

  render() {

    const {onLayerChange, onRangeChange} = this.props;

    const options = [
      { label: 'Males', value: 'heatmap_male' },
      { label: 'Females', value: 'heatmap_female' },
    ];

    return (
      <div className={styles.heatmapcontrol}>
        <div className={styles.box}>
              <Card>

                <div>
                  <CheckboxGroup options={options} defaultValue={['heatmap_male', 'heatmap_female']} onChange={onLayerChange} />
                </div>

                <Slider range defaultValue={[20, 50]} onChange={onRangeChange} />

              </Card>
        </div>
      </div>
    );
  }
}

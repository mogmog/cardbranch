import React from "react";
import { Badge } from 'antd';

export default class Thing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {...props.formData};
  }

  render() {

    return (
      <Badge count={'I display a count'}/>
    );
  }
}

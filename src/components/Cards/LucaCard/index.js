import React, {PureComponent} from 'react';
import {Row, Col, Card, Button} from 'antd';
import ReactCardFlip from 'react-card-flip';
import styles from './index.less';

export default class LucaCard extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isFlipped: false
    };
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({isFlipped: !this.state.isFlipped});
  }

  render() {

    const {front, back, width=400, height = 400} = this.props;

    return (
      <div style={{'width' : width}} className={styles.lucacard}>
        <ReactCardFlip isFlipped={this.state.isFlipped} >

          <div key="front" >

            <Card key={1}  style={{'width' : width, 'height' : height}}>

              <Row>
                <Col>
                  {front}
                </Col>
              </Row>

              <Row>
                <Col>
                  <a onClick={this.handleClick.bind(this)}>See more</a>
                </Col>
              </Row>

            </Card>
          </div>

          <div key="back">
            <Card key={2} style={{'width' : width, 'height' : height}}>

              back

              {back}

              <button onClick={this.handleClick.bind(this)}>Back</button>

            </Card>
          </div>


        </ReactCardFlip>

      </div>

    );
  }
}


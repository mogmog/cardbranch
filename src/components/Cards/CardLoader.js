import React, {Component} from 'react';

export default class extends Component {

  state = {
    Card : {default : x => <span>Loading</span>}
  }

  constructor(props) {
    super();
  }

  componentDidMount() {

    import('./Store/StreetViewCard/StreetViewCard').then((Card) => {
      this.setState({ Card });
    });
  }

  render() {

    const { card } = this.props;


    console.log(card);

    let Card = this.state.Card.default;

    return (
     <div> <Card data={card.data }/></div>
    );
  }

}




//model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)

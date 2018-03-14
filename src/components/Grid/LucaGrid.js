import React, { Component } from 'react';
import {
  SpringGrid,
  CSSGrid,
  makeResponsive,
  measureItems,
  layout as layouts,
} from 'react-stonecutter';

import styles from './LucaGrid.less';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = this.createGrid(props);
  }

  componentWillReceiveProps(nextProps) {
      this.setState(this.createGrid(nextProps));
  }

  createGrid = ({ useCSS, measured, responsive }) => {
    let Grid = useCSS ? CSSGrid : SpringGrid;

    if (measured) {
      Grid = measureItems(Grid);
    }

    if (responsive) {
      Grid = makeResponsive(Grid, {
        maxWidth: 1000,
        minPadding: 10
      });
    }

    return { Grid };
  };

  render() {
    const {
      children,
      useCSS,
      responsive,
      layout,
      enterExitStyle,
      duration,
      easing,
      stiffness,
      damping,
      gutters,
      columns,
      ...rest
    } = this.props;

    const { Grid } = this.state;

    const gridLayout = layouts[layout];

    return (
      <Grid
        {...rest}
        className={styles.lucagrid}
        component="ul"
        columns={!responsive ? columns : null}
        columnWidth={300}
        gutterWidth={gutters}
        gutterHeight={gutters}
        layout={gridLayout}
        duration={useCSS ? duration : null}
        springConfig={
          !useCSS && stiffness && damping ? { stiffness, damping } : null
        }
      >
        {children}
      </Grid>
    );
  }
}

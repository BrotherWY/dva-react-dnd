import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Knight from '../components/Knight';
import Square from '../components/Square';
import Board from '../components/Board';

function IndexPage({ knightPosition, dispatch }) {
  return (
    <Board
      knightPosition={knightPosition}
      dispatch={dispatch}
      />
  );
}

IndexPage.propTypes = {
};

// export default connect()(observe(knightPosition => <Board knightPosition={knightPosition} />));

const mapStateToProps = ({ game }) => ({ knightPosition: game.knightPosition })

export default connect(mapStateToProps)(IndexPage);

import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
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

const mapStateToProps = ({ game }) => ({ knightPosition: game.knightPosition })

export default connect(mapStateToProps)(IndexPage);

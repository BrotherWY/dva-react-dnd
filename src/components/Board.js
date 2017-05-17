import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoardSquare from './BoardSquare';
import Knight from './Knight';
import { DragDropContext } from 'react-dnd';
import HTML5Bachend from 'react-dnd-html5-backend';

class Board extends Component {
  renderSquare(i) {
    const x = i % 8;
    const y = Math.floor(i / 8);
    const [knightX, knightY] = this.props.knightPosition;
    const dx = x - knightX;
    const dy = y - knightY;
    const canDrop = ((Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2));

    return (
      <div
        key={i}
        style={{
          width: '12.5%',
          height: '12.5%'
        }}>
        <BoardSquare
          x={x}
          y={y}
          canDrop={canDrop}
          dispatch={this.props.dispatch}
          >
          {this.renderPiece(x, y)}
        </BoardSquare>
      </div>
    );
  }

  renderPiece(x, y) {
    const [knightX, knightY] = this.props.knightPosition;
    if (x === knightX && y === knightY) {
      return <Knight />;
    }
  }

  render() {
    const squares = [];
    for (let i = 0; i < 64; i++) {
      squares.push(this.renderSquare(i));
    }

    return (
      <div style={{
        display: 'flex',
        margin: 'auto',
        flexWrap: 'wrap',
        width: '500px',
        height: '500px',
      }}>
        {squares}
      </div>
    );
  }
}

Board.propTypes = {
  knightPosition: PropTypes.arrayOf(
    PropTypes.number.isRequired
  ).isRequired
};

export default DragDropContext(HTML5Bachend)(Board);
import React, { useContext } from 'react';
import { BoardContext, GAME_ACTIONS } from '../context/BoardContext';
import './board.css';
const Board = () => {
  const { state, dispatch } = useContext(BoardContext);
  const { turn, values: board, gameOver } = state;

  const onClickHandler = (index, move) => {
    if (gameOver.over) return;
    dispatch({ type: GAME_ACTIONS.TURN, payload: { index } });
    dispatch({ type: GAME_ACTIONS.CHECK_GAME_STATE, payload: { move } });
  };
  const onResetGame = () => {
    const flag = window.confirm('Are you sure you want to restart the game?');
    if (flag) {
      dispatch({ type: GAME_ACTIONS.RESET_GAME });
    }
  };

  return (
    <div className="root">
      <div className="banner information">
        <label>Current Turn : {turn}</label>
      </div>
      <div className="board">
        {board.map((row, idx) => {
          return row.map((cell, cell_id) => {
            return (
              <button
                onClick={(event) => {
                  onClickHandler(idx + ',' + cell_id, state.turn);
                }}
                key={idx + ',' + cell_id}
                className="btn cell"
                type="button"
                value={idx + ',' + cell_id}
                disabled={cell.move !== ''}
              >
                {cell.move}
              </button>
            );
          });
        })}
      </div>
      {gameOver.over && (
        <div className="banner result">
          {gameOver.winner && <div>Winner is : {gameOver.winner}</div>}
          <button className="btn restart" type="button" onClick={onResetGame}>
            restart
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;

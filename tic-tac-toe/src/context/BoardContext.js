import React, { createContext, useReducer } from 'react';

export const GAME_ACTIONS = {
  TURN: 'TURN_UPDATE',
  CHECK_GAME_STATE: 'CHECK_GAME',
  RESET_GAME: 'reset_game',
};

// UTILITIES
const isGameOver = (state, val) => {
  const { values } = state;

  const checkDiagonals = () => {
    if (
      (values[0][0].move === val &&
        values[1][1].move === val &&
        values[2][2].move === val) ||
      (values[0][2].move === val &&
        values[1][1].move === val &&
        values[2][0].move === val)
    ) {
      return val;
    }
    return -1;
  };

  const checkVerticals = () => {
    for (let i = 0; i < 3; i++) {
      if (
        values[0][i].move === val &&
        values[1][i].move === val &&
        values[2][i].move === val
      ) {
        return val;
      }
    }
    return -1;
  };

  const checkHorizontals = () => {
    for (let i = 0; i < 3; i++) {
      if (
        values[i][0].move === val &&
        values[i][1].move === val &&
        values[i][2].move === val
      ) {
        return val;
      }
    }
    return -1;
  };

  let isOverByBoardFill = true;

  const diag = checkDiagonals();
  const ver = checkVerticals();
  const hor = checkHorizontals();

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      //checks if all rows are filled,
      if (values[i][j].move === '') {
        isOverByBoardFill = false;
        break;
      }
    }
  }

  return {
    over: isOverByBoardFill || diag !== -1 || ver !== -1 || hor !== -1,
    winner: diag === -1 ? (ver === -1 ? (hor === -1 ? '' : hor) : ver) : diag,
  };
};
const checkTurn = () => (Math.floor(Math.random() * 2) === 0 ? 'O' : 'X');

// INITIAL STATE
const INIT_BOARD_STATE = {
  turn: checkTurn(),
  values: Array.from(Array(3), () =>
    new Array(3).fill('').map((x, idx) => {
      return { ...x, id: idx, move: '' };
    })
  ),
  gameOver: { over: false, winner: '' },
};

const boardReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GAME_ACTIONS.TURN:
      const { index } = payload;
      const [row, col] = index.split(',');
      const newTurn = state.turn === 'O' ? 'X' : 'O';

      return {
        ...state,
        turn: newTurn,
        values: state.values.map((currRow, r) => {
          return currRow.map((cell, c) => {
            if (+r === +row && +c === +col)
              return { ...cell, move: state.turn };
            return cell;
          });
        }),
      };
    case GAME_ACTIONS.CHECK_GAME_STATE:
      const gameOver = isGameOver(state, payload.move);
      return {
        ...state,
        gameOver: { over: gameOver.over, winner: gameOver.winner },
      };
    case GAME_ACTIONS.RESET_GAME:
      return { ...INIT_BOARD_STATE };
    default:
      console.log('default');
      return state;
  }
};
// CREATE CONTEXT
export const BoardContext = createContext();

//CREATE PROVIDER
const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, INIT_BOARD_STATE);
  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;

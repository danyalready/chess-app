import { createContext, useReducer } from 'react';

import { getChessPieceMoves } from 'src/utils/board';
import { initialBoard } from 'src/constants/chess';

import type { ReactNode, Dispatch } from 'react';
import type { BoardAction } from 'src/actions/board';
import type { Board, Square } from 'src/types/chess';

// BLACK
// [color][name] = bp - black pawn ♟
// [color][name] = bb - black bishop ♝
// [color][name] = bk - black knight ♞
// [color][name] = br - black rook ♜
// [color][name] = bq - black queen ♛
// [color][name] = bK - black king ♚

// WHITE
// [color][name] = wp - white pawn ♙
// [color][name] = wb - white bishop ♗
// [color][name] = wk - white knight ♘
// [color][name] = wk - white rook ♖
// [color][name] = wq - white queen ♕
// [color][name] = wK - white king ♔

type BoardState = {
    board: Board;
    selectedSquare: null | Square;
    history: string[];
};

const initialBoardState: BoardState = {
    board: initialBoard,
    selectedSquare: null,
    history: [],
};

const boardReducer = (state: BoardState, action: BoardAction) => {
    switch (action.type) {
        case 'selectSquare': {
            let moves: string[] = [];

            if (action.payload.value) {
                moves = getChessPieceMoves(action.payload.key, action.payload.value);
                console.log(moves);
            }

            // TODO: filter suggested moves
            moves;

            // TODO: set suggested moves
            return { ...state, selectedSquare: action.payload };
        }
        default:
            return state;
    }
};

export const BoardContext = createContext<[BoardState, Dispatch<BoardAction>] | null>(null);

export const BoardProvider = (props: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(boardReducer, initialBoardState);

    return <BoardContext.Provider value={[state, dispatch]}>{props.children}</BoardContext.Provider>;
};

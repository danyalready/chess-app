import { createContext, useReducer } from 'react';

import { getChessPieceMoves } from 'src/utils/chess';
import { initialBoard } from 'src/constants/chess';

import type { ReactNode, Dispatch } from 'react';
import type { ChessAction } from 'src/actions/board';
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

type ChessState = {
    board: Board;
    selectedSquare: null | Square;
    history: string[];
};

const initialChessState: ChessState = {
    board: initialBoard,
    selectedSquare: null,
    history: [],
};

const chessReducer = (state: ChessState, action: ChessAction) => {
    switch (action.type) {
        case 'selectSquare': {
            // Creates a set of taken square keys for faster lookup
            const takenSquareKeys = new Set<string>();
            for (const row of state.board) {
                for (const square of row) {
                    if (square.value?.charAt(0) === action.payload.value?.charAt(0)) {
                        takenSquareKeys.add(square.key);
                    }
                }
            }

            const possibleMoves: string[] = action.payload.value
                ? getChessPieceMoves(action.payload.key, action.payload.value, Array.from(takenSquareKeys.values()))
                : [];

            // Creates updated board with possible moves
            const updatedBoard = state.board.map((row) =>
                row.map((square) => ({ ...square, isMove: possibleMoves.includes(square.key) }))
            );

            return { ...state, selectedSquare: action.payload, board: updatedBoard };
        }
        default:
            return state;
    }
};

export const ChessContext = createContext<[ChessState, Dispatch<ChessAction>] | null>(null);

export const ChessProvider = (props: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(chessReducer, initialChessState);

    return <ChessContext.Provider value={[state, dispatch]}>{props.children}</ChessContext.Provider>;
};

import { createContext, useReducer } from 'react';

import { getChessPieceMoves } from 'src/utils/chess';
import { initialBoard } from 'src/constants/chess';

import type { ReactNode, Dispatch } from 'react';
import type { ChessAction } from 'src/actions/board';
import type { Board, Square, BoardHistory } from 'src/types/chess';

type ChessState = {
    board: Board;
    selectedSquare: null | Square;
    history: BoardHistory;
};

const initialChessState: ChessState = {
    board: initialBoard,
    selectedSquare: null,
    history: [],
};

const chessReducer = (state: ChessState, action: ChessAction) => {
    const { board, selectedSquare } = state;

    switch (action.type) {
        case 'selectSquare': {
            const currentSquare = action.payload;

            // If a piece selected and the next selected square is a move
            if (selectedSquare?.value && currentSquare.isMove) {
                const updatedBoard = board.map((row) => {
                    return row.map((square) => {
                        // Removes the selected piece from it's previous position
                        if (square.key === selectedSquare.key) {
                            return { ...square, value: null };
                        }

                        // Moves the selected piece to the next selected move-square
                        if (square.key === currentSquare.key) {
                            return { ...square, value: selectedSquare.value, isMove: false };
                        }

                        return { ...square, isMove: false };
                    });
                });

                return { ...state, board: updatedBoard, selectedSquare: null };
            }

            // Creates a set of taken square keys for faster lookup
            const capturedKeys = new Set<string>();
            const occupiedKeys = new Set<string>();

            for (const row of board) {
                for (const square of row) {
                    if (square.value && square.value.charAt(0) !== currentSquare.value?.charAt(0)) {
                        capturedKeys.add(square.key);
                        continue;
                    }

                    if (
                        square.value?.charAt(0) === currentSquare.value?.charAt(0) ||
                        (currentSquare.value?.charAt(1) === 'p' && square.value)
                    ) {
                        occupiedKeys.add(square.key);
                    }
                }
            }

            const possibleMoves: string[] = currentSquare.value
                ? getChessPieceMoves(currentSquare.key, currentSquare.value, {
                      capturedKeys: Array.from(capturedKeys.values()),
                      occupiedKeys: Array.from(occupiedKeys.values()),
                  })
                : [];

            // Sets possible moves for the selected piece
            const updatedBoard = state.board.map((row) => {
                return row.map((square) => ({ ...square, isMove: possibleMoves.includes(square.key) }));
            });

            return { ...state, selectedSquare: action.payload, board: updatedBoard };
        }
        case 'unselectSquare': {
            const updatedBoard = board.map((row) => row.map((square) => ({ ...square, isMove: false })));

            return { ...state, selectedSquare: null, board: updatedBoard };
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

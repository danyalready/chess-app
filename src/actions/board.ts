import type { Dispatch } from 'react';
import type { Square } from 'src/types/chess';

export type ChessAction = {
    type: 'selectSquare';
    payload: Square;
};

export const selectSquare = (dispatch: Dispatch<ChessAction>, payload: Square) => {
    dispatch({ type: 'selectSquare', payload });
};

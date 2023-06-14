import type { Dispatch } from 'react';
import type { Square } from 'src/types/chess';

export type BoardAction = {
    type: 'selectSquare';
    payload: Square;
};

export const selectSquare = (dispatch: Dispatch<BoardAction>, payload: Square) => {
    dispatch({ type: 'selectSquare', payload });
};

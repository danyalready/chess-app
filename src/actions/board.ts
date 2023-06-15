import type { Dispatch } from 'react';
import type { Square } from 'src/types/chess';

export type ChessAction = {
    type: 'selectSquare' | 'unselectSquare';
    payload: Square;
};

export const selectSquare = (dispatch: Dispatch<ChessAction>, payload: Square) => {
    dispatch({ type: 'selectSquare', payload });
};

export const unselectSquare = (dispatch: Dispatch<ChessAction>) => {
    dispatch({ type: 'unselectSquare', payload: { key: '', value: null, isMove: false } });
};

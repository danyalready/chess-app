import { useEffect } from 'react';

import { getPieceEmoji } from 'src/utils/chess';
import * as css from 'src/utils/css';
import { useChess } from 'src/hooks/chess';
import { selectSquare, unselectSquare } from 'src/actions/board';

import './Board.css';

const Board = () => {
    const [{ board, selectedSquare }, dispatch] = useChess();

    useEffect(() => {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                unselectSquare(dispatch);
            }
        });
    }, [dispatch]);

    return (
        <div className='board'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='board-row'>
                    {row.map((square) => (
                        <div
                            key={square.key}
                            className={css.mergeModifiers('board-square', [
                                selectedSquare?.key === square.key ? 'selected' : '',
                                square.value ? 'grabble' : '',
                                square.isMove ? 'move' : '',
                            ])}
                            onClick={() => selectSquare(dispatch, square)}
                        >
                            {square.value && <div>{getPieceEmoji(square.value)}</div>}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;

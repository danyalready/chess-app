import { getPieceEmoji } from 'src/utils/board';
import * as css from 'src/utils/css';
import { useBoard } from 'src/hooks/board';
import { selectSquare } from 'src/actions/board';

import './Board.css';

const Board = () => {
    const [{ board, selectedSquare }, dispatch] = useBoard();

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

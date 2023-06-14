import { useContext } from 'react';
import { BoardContext } from 'src/context/board';

export const useBoard = () => {
    const context = useContext(BoardContext);

    if (!context) {
        throw Error('The `useBoard` can only be used inside the `BoardProvider`.');
    }

    return context;
};

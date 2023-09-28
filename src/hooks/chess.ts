import { useContext } from 'react';
import { ChessContext } from 'src/context/chess';

export const useChessContext = () => {
    const context = useContext(ChessContext);

    if (!context) {
        throw Error('The `useBoard` can only be used inside the `BoardProvider`.');
    }

    return context;
};

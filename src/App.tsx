import { ChessProvider } from './context/chess';
import Board from './components/Board/Board';

function App() {
    return (
        <ChessProvider>
            <Board />
        </ChessProvider>
    );
}

export default App;

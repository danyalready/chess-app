import { ChessProvider } from './context/chess';
import Board from './components/Board/Board';
import './App.css';

function App() {
    return (
        <ChessProvider>
            <Board />
        </ChessProvider>
    );
}

export default App;

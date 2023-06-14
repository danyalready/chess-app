import { BoardProvider } from './context/board';
import Board from './components/Board/Board';
import './App.css';

function App() {
    return (
        <BoardProvider>
            <Board />
        </BoardProvider>
    );
}

export default App;

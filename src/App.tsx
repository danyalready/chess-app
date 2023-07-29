import { ChessProvider } from 'src/context/chess';
import { Board, History, Chat } from 'src/components';

import './App.css';

function App() {
    return (
        <ChessProvider>
            <div className="grid-2-cols">
                <Board />
                <div>
                    <History />
                    <Chat />
                </div>
            </div>
        </ChessProvider>
    );
}

export default App;

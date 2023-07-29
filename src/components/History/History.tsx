import { useChessContext } from 'src/hooks/chess';

const History = () => {
    const [{ history }] = useChessContext();
    console.log(history);

    return <div className="history">Move history</div>;
};

export default History;

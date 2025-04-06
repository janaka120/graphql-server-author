import { GameI } from "./ListingGames";

interface GameItemI {
    game: GameI;
    updateItem: (id: string) => void;
    deleteItem: (id: string) => void;
}

const GameItem = ({game, deleteItem, updateItem}: GameItemI) => {

    return (
        <div className="flex flex-row items-center justify-center m-4 gap-4" key={game.id}>
        <span>{game.title}: {game?.platform?.join(',') || '-'}</span>
        <button className="text-sm" onClick={() => deleteItem(game.id)}>❌</button>
        <span>|</span>
        <button className="text-sm" onClick={() => updateItem(game.id)}>✏️</button>
    </div>   
    )
}

export default GameItem;
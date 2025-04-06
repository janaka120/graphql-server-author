import { ApolloQueryResult, useMutation } from "@apollo/client";
import { GameI } from "./ListingGames";
import { DELETE_GAME } from "../GameQuery";
import { Games } from "../AppContext";

interface GameItemI {
    game: GameI;
    updateItem: (id: string) => void;
    deleteItem: (id: string) => void;
    refetchGames: (variables?: {gameObj: Games} | undefined) => Promise<ApolloQueryResult<any>>;
}

const GameItem = ({game, updateItem, refetchGames}: GameItemI) => {

    const [deleteGame, {loading: loadingDelete, error}]  = useMutation(DELETE_GAME);

    const onDeleteHandler = (id: string) => {
        deleteGame({
            variables: {
                id
            }
        }).then(() => {
            refetchGames();
            alert('Game deleted successfully!')
        }).catch((error) => {
            console.log("Delete Game Error >>", error);
        })
    }

    if(error) {
        alert('Error occurred while delete Game!\n' + error.message)
    }

    return (
        <li key={game.id} className="py-3 flex items-center justify-between">
            <div>
                <span className="font-semibold">{game.title}</span>
                {game.platform && game.platform.length > 0 && (
                    <span className="text-gray-600 text-sm ml-2">({game.platform.join(', ')})</span>
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onDeleteHandler(game.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                    disabled={loadingDelete}
                >
                    {loadingDelete ? <span className="animate-spin">⏳</span> : '🗑️'}
                </button>
                <button
                    onClick={() => updateItem(game.id)}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                    ✏️
                </button>
            </div>
        </li>
    )
}

export default GameItem;
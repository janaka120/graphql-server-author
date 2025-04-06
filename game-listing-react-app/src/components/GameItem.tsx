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
        }).catch((error) => {
            console.log("Delete Game Error >>", error);
        })
    }

    if(error) {
        alert('Error occurred while delete Game!\n' + error.message)
    }

    return (
        <div className="flex flex-row items-center justify-center m-4 gap-4" key={game.id}>
        <span>{game.title}: {game?.platform?.join(',') || '-'}</span>
        <button className="text-sm" onClick={() => onDeleteHandler(game.id)} disabled={loadingDelete}>{loadingDelete ? '⏳' : '❌'}</button>
        <span>|</span>
        <button className="text-sm" onClick={() => updateItem(game.id)}>✏️</button>
    </div>   
    )
}

export default GameItem;
import { useContext } from "react";
import { AppContext, Games } from "../AppContext";
import GameItem from "./GameItem";
import { ApolloQueryResult } from "@apollo/client";

export interface GameI {
    id: string;
    title: string;
    platform?: string[];
}
interface ListingGamesI {
    loading: boolean;
    errorMessage?: string;
    itemClick: (id: string) => void;
    refetchGames: (variables?: {gameObj: Games} | undefined) => Promise<ApolloQueryResult<any>>;
}
const ListingGames = ({loading, errorMessage, itemClick, refetchGames}: ListingGamesI) => {

    const {games} = useContext(AppContext);

    if(loading) {
        return <div>Loading...</div>
    }

    if(errorMessage) {
        return <div>{errorMessage}</div>
    }

    const onItemDeleteHandler = (id: string) => {
        itemClick(id);
    }

    const onItemUpdateHandler = (id: string) => {
        itemClick(id);
    }

    return(
        <section className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Game Library</h2>
            {games.length === 0 ? (
                    <p className="text-gray-500">No games added yet.</p>
                ) : games.map((game: GameI) => {
                return (
                    <ul className="divide-y divide-gray-200">
                        <GameItem key={game.id} game={game} updateItem={onItemDeleteHandler} deleteItem={onItemUpdateHandler} refetchGames={refetchGames} />
                    </ul>
            )})}
        </section>
    )
}

export default ListingGames;
import { useEffect, useState } from "react";
import {ApolloQueryResult, useMutation} from '@apollo/client';
import { ADD_GAME, UPDATE_GAME } from "../GameQuery";
import { Games } from "../AppContext";
import { GameI } from "./ListingGames";

interface CreateGameI {
    selectedGame: GameI | null;
    refetchGames: (variables?: {gameObj: Games} | undefined) => Promise<ApolloQueryResult<any>>;
    clear: () => void;
}
const CreateGame = (props: CreateGameI) => {
    const {refetchGames, selectedGame, clear} = props;
    const [title, setTitle] = useState(selectedGame?.title || '');
    const [platform, setPlatform] = useState(selectedGame?.platform?.[0] || '');

    useEffect(() => {
        if(selectedGame?.id && selectedGame.title) {
            setTitle(selectedGame.title);
            setPlatform(selectedGame?.platform?.[0] || '');
        }
    }, [selectedGame?.id, selectedGame?.platform, selectedGame?.title]);

    const[createGame, {loading: createLoading, error: createError}] = useMutation(ADD_GAME);
    const [updateGame, {loading: updateLoading, error: updateError}] = useMutation(UPDATE_GAME);


    const label = selectedGame?.id ? 'Update' : 'Add';
    const loading =  createLoading || updateLoading;
    const error = createError || updateError;

    const clearInputFields = () => {
        setTitle('');
        setPlatform('');
        clear();
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setTitle(newValue)
    }

    const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPlatform(e.target.value);
    }
    const onClickHandler = () => {
        if(!title || !platform) {
            alert('Please select title and platform values.')
            return;
        }
        const slicedPlatformList = selectedGame?.platform && selectedGame?.platform?.length > 1 ? selectedGame?.platform?.slice(1) : []
        const updatedPlatformList = [platform, ...slicedPlatformList ];
        if(selectedGame?.id) {
            updateGame({
                variables: {
                    id: selectedGame.id,
                    editGame: {
                        // id: selectedGame.id,
                        title,
                        platform: updatedPlatformList
                    }
                }
            }).then(() => {
                clearInputFields();
                refetchGames();
                alert('Game updated successfully!');
            })
        }else {
            createGame({
                variables: {
                    gameObj: {
                        title,
                        platform: updatedPlatformList
                    }
                }
            }).then(() => {
                clearInputFields();
                refetchGames();
                alert('Game added successfully!');
            })
        }
    }

    const onClearHandler = () => {
        clearInputFields();
        clear();
    }
    
    return(
        <div className="container mx-auto p-8">
            {/* Add Game Section */}
            <section className="bg-white shadow-md rounded-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">{`${label} Game`}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                        <label htmlFor="gameTitle" className="block text-gray-700 text-sm font-bold mb-2">Game Title</label>
                        <input
                            type="text"
                            id="gameTitle"
                            value={title}
                            onChange={onChangeHandler}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="platformSelect" className="block text-gray-700 text-sm font-bold mb-2">Platform</label>
                        <select
                            id="platformSelect"
                            value={platform}
                            onChange={onSelectHandler}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
                        >
                            <option value="">Select Platform</option>
                            <option value="Nintendo Switch">Nintendo Switch</option>
                            <option value="PlayStation 5">PlayStation 5</option>
                            <option value="PC">PC</option>
                            <option value="PlayStation 4">PlayStation 4</option>
                            <option value="Xbox One">Xbox One</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClearHandler}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClickHandler}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : (selectedGame?.id ? 'Update Game' : 'Add Game')}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
            </section>
        </div>
    ) 
}

export default CreateGame;
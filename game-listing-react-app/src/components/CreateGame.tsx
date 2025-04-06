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
        <div className="p-4">
            <h1 className="text-3xl font-bold underline">
                {`${label} Game`}
            </h1>
            <div className="flex flex-row m-4 gap-4 justify-center items-center">
                <div className="flex gap-4">
                    <span>Game</span>
                    <input value={title} onChange={onChangeHandler} className="border-blue-300 border-solid border-2" />
                </div>
                <div className="flex gap-4">
                    <span>Platform</span>
                    <select value={platform} onChange={onSelectHandler} className="border-blue-300 border-solid border-2">
                        <option value="">Select</option>
                        <option value="PS5">PS5</option>
                        <option value="Xbox">Xbox</option>
                        <option value="PC">PC</option>
                    </select>
                </div>
                <button onClick={onClearHandler} className="border px-2 border-b-gray-600 border-solid text-black bg-white hover:bg-gray-500 hover:text-white">Clear</button>
                <button onClick={onClickHandler} className="border px-2 border-blue-500 border-solid text-white bg-blue-400 hover:bg-white hover:text-blue-400">{loading ? 'Loading...' : label}</button>
            </div>
            {error && <span className="text-red-500 text-xs">{createError?.message || updateError?.message}</span>}
        </div>
    ) 
}

export default CreateGame;
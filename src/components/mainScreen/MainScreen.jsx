import React, {useState} from 'react';
import Title from "./Title";
import WelcomeScreen from "./WelcomeScreen";
import {Game} from "../game/Game";

import '../../utils/style.css';

const MainScreen = () => {
    const [appState, setAppState] = useState('welcome');
    const startPlay = () => {
        setAppState('play');
    }
    return (
        <React.Fragment>
            <Title/>
            {appState === 'play' ? <Game/> : <WelcomeScreen startPlay={startPlay}/>}
        </React.Fragment>
    );
};

export default MainScreen;

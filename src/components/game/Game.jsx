import React, {useState, useRef} from 'react';
import {
    placeAllComputerShips,
    SQUARE_STATE,
    indexToCoords,
    putEntityInLayout,
    generateEmptyLayout,
    generateRandomIndex,
    getNeighbors,
    updateSunkShips,
    coordsToIndex,
} from './layoutHelpers';
import {GameView} from "./gameView/GameView";

const AVAILABLE_SHIPS = [
    {
        id: 1,
        name: 'Лінкор',
        length: 4,
        placed: null,
    },
    {
        id: 2,
        name: 'Крейсер1',
        length: 3,
        placed: null,
    },
    {
        id: 3,
        name: 'Крейсер2',
        length: 3,
        placed: null,
    },
    {
        id: 4,
        name: 'Есмінець1',
        length: 2,
        placed: null,
    },
    {
        id: 5,
        name: 'Есмінець2',
        length: 2,
        placed: null,
    },
    {
        id: 6,
        name: 'Есмінець3',
        length: 2,
        placed: null,
    },
    {
        id: 7,
        name: 'Торпедний катер1',
        length: 1,
        placed: null,
    },
    {
        id: 8,
        name: 'Торпедний катер2',
        length: 1,
        placed: null,
    },
    {
        id: 9,
        name: 'Торпедний катер3',
        length: 1,
        placed: null,
    },
    {
        id: 10,
        name: 'Торпедний катер4',
        length: 1,
        placed: null,
    },
];

export const Game = () => {
    const [gameState, setGameState] = useState('placement');
    const [winner, setWinner] = useState(null);

    const [availableShips, setAvailableShips] = useState(AVAILABLE_SHIPS);
    const [currentlyPlacing, setCurrentlyPlacing] = useState(null);
    const [placedShips, setPlacedShips] = useState([]);
    const [computerShips, setComputerShips] = useState([]);
    const [hitsByComputer, setHitsByComputer] = useState([]);
    const [hitsByPlayer, setHitsByPlayer] = useState([]);

    // *** PLAYER ***
    const selectShip = (shipName) => {
        let shipIdx = availableShips.findIndex((ship) => ship.name === shipName);
        const shipToPlace = availableShips[shipIdx];

        setCurrentlyPlacing({
            ...shipToPlace,
            orientation: 'horizontal',
            position: null,
        });
    };

    const placeShip = (currentlyPlacing) => {
        setPlacedShips([
            ...placedShips,
            {
                ...currentlyPlacing,
                placed: true,
            },
        ]);

        setAvailableShips((previousShips) =>
            previousShips.filter((ship) => ship.name !== currentlyPlacing.name)
        );

        setCurrentlyPlacing(null);
    };

    const rotateShip = (event) => {
        if (currentlyPlacing != null && event.button === 2) {
            setCurrentlyPlacing({
                ...currentlyPlacing,
                orientation:
                    currentlyPlacing.orientation === 'vertical' ? 'horizontal' : 'vertical',
            });
        }
    };

    const startTurn = () => {
        generateComputerShips();
        setGameState('player-turn');
    };

    const changeTurn = () => {
        setGameState((oldGameState) =>
            oldGameState === 'player-turn' ? 'computer-turn' : 'player-turn'
        );
    };

    // *** COMPUTER ***
    const generateComputerShips = () => {
        let placedComputerShips = placeAllComputerShips(AVAILABLE_SHIPS.slice());
        setComputerShips(placedComputerShips);
    };

    const computerFire = (index, layout) => {
        let computerHits;

        if (layout[index] === 'ship') {
            computerHits = [
                ...hitsByComputer,
                {
                    position: indexToCoords(index),
                    type: SQUARE_STATE.hit,
                },
            ];
        }
        if (layout[index] === 'empty') {
            computerHits = [
                ...hitsByComputer,
                {
                    position: indexToCoords(index),
                    type: SQUARE_STATE.miss,
                },
            ];
        }
        const sunkShips = updateSunkShips(computerHits, placedShips);
        const sunkShipsAfter = sunkShips.filter((ship) => ship.sunk).length;
        const sunkShipsBefore = placedShips.filter((ship) => ship.sunk).length;
        if (sunkShipsAfter > sunkShipsBefore) {
            playSound('sunk');
        }
        setPlacedShips(sunkShips);
        setHitsByComputer(computerHits);
    };

    const handleComputerTurn = () => {
        changeTurn();

        if (checkIfGameOver()) {
            return;
        }

        let layout = placedShips.reduce(
            (prevLayout, currentShip) =>
                putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship),
            generateEmptyLayout()
        );

        layout = hitsByComputer.reduce(
            (prevLayout, currentHit) =>
                putEntityInLayout(prevLayout, currentHit, currentHit.type),
            layout
        );

        layout = placedShips.reduce(
            (prevLayout, currentShip) =>
                currentShip.sunk
                    ? putEntityInLayout(prevLayout, currentShip, SQUARE_STATE.ship_sunk)
                    : prevLayout,
            layout
        );

        let successfulComputerHits = hitsByComputer.filter((hit) => hit.type === 'hit');

        let nonSunkComputerHits = successfulComputerHits.filter((hit) => {
            const hitIndex = coordsToIndex(hit.position);
            return layout[hitIndex] === 'hit';
        });

        let potentialTargets = nonSunkComputerHits
            .flatMap((hit) => getNeighbors(hit.position))
            .filter((idx) => layout[idx] === 'empty' || layout[idx] === 'ship');

        if (potentialTargets.length === 0) {
            let layoutIndices = layout.map((item, idx) => idx);
            potentialTargets = layoutIndices.filter(
                (index) => layout[index] === 'ship' || layout[index] === 'empty'
            );
        }

        let randomIndex = generateRandomIndex(potentialTargets.length);

        let target = potentialTargets[randomIndex];

        setTimeout(() => {
            computerFire(target, layout);
            changeTurn();
        }, 300);
    };

    // *** END GAME ***

    const checkIfGameOver = () => {
        let successfulPlayerHits = hitsByPlayer.filter((hit) => hit.type === 'hit').length;
        let successfulComputerHits = hitsByComputer.filter((hit) => hit.type === 'hit').length;

        if (successfulComputerHits === 20 || successfulPlayerHits === 20) {
            setGameState('game-over');

            if (successfulComputerHits === 20) {
                setWinner('computer');
                playSound('lose');
            }
            if (successfulPlayerHits === 20) {
                setWinner('player');
                playSound('win');
            }

            return true;
        }

        return false;
    };

    const startAgain = () => {
        setGameState('placement');
        setWinner(null);
        setCurrentlyPlacing(null);
        setPlacedShips([]);
        setAvailableShips(AVAILABLE_SHIPS);
        setComputerShips([]);
        setHitsByPlayer([]);
        setHitsByComputer([]);
    };

    const sunkSoundRef = useRef(null);
    const clickSoundRef = useRef(null);
    const lossSoundRef = useRef(null);
    const winSoundRef = useRef(null);

    const stopSound = (sound) => {
        sound.current.pause();
        sound.current.currentTime = 0;
    };

    const playSound = (sound) => {
        if (sound === 'sunk') {
            stopSound(sunkSoundRef);
            sunkSoundRef.current.play();
        }

        if (sound === 'click') {
            stopSound(clickSoundRef);
            clickSoundRef.current.play();
        }

        if (sound === 'lose') {
            stopSound(lossSoundRef);
            lossSoundRef.current.play();
        }

        if (sound === 'win') {
            stopSound(winSoundRef);
            winSoundRef.current.play();
        }
    };

    return (
        <React.Fragment>
            <audio
                ref={sunkSoundRef}
                src="/sounds/ship_sunk.wav"
                className="clip"
                preload="auto"
            />
            <audio
                ref={clickSoundRef}
                src="/sounds/click.wav"
                className="clip"
                preload="auto"
            />
            <audio
                ref={lossSoundRef}
                src="/sounds/lose.wav"
                className="clip"
                preload="auto"
            />
            <audio
                ref={winSoundRef}
                src="/sounds/win.wav"
                className="clip"
                preload="auto"
            />
            <GameView
                availableShips={availableShips}
                selectShip={selectShip}
                currentlyPlacing={currentlyPlacing}
                setCurrentlyPlacing={setCurrentlyPlacing}
                rotateShip={rotateShip}
                placeShip={placeShip}
                placedShips={placedShips}
                startTurn={startTurn}
                computerShips={computerShips}
                gameState={gameState}
                changeTurn={changeTurn}
                hitsByPlayer={hitsByPlayer}
                setHitsByPlayer={setHitsByPlayer}
                hitsByComputer={hitsByComputer}
                setHitsByComputer={setHitsByComputer}
                handleComputerTurn={handleComputerTurn}
                checkIfGameOver={checkIfGameOver}
                startAgain={startAgain}
                winner={winner}
                setComputerShips={setComputerShips}
                playSound={playSound}
            />
        </React.Fragment>
    );
};

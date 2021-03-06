import React from 'react';
import {PlayerTips} from "./playerTips/PlayerTips";
import {PlayerFleet} from "./playerFleet/PlayerFleet";
import {PlayerBoard} from "./playerBoard/PlayerBoard";
import {ComputerBoard} from "./computerBoard/ComputerBoard";

export const GameView = ({
                             availableShips,
                             selectShip,
                             currentlyPlacing,
                             setCurrentlyPlacing,
                             rotateShip,
                             placeShip,
                             placedShips,
                             startTurn,
                             computerShips,
                             gameState,
                             changeTurn,
                             hitComputer,
                             hitsByPlayer,
                             setHitsByPlayer,
                             hitsByComputer,
                             handleComputerTurn,
                             checkIfGameOver,
                             winner,
                             startAgain,
                             setComputerShips,
                             playSound,
                         }) => {
    return (
        <section id="game-screen">
            {gameState !== 'placement' ? (
                <PlayerTips
                    gameState={gameState}
                    hitsbyPlayer={hitsByPlayer}
                    hitsByComputer={hitsByComputer}
                    winner={winner}
                    startAgain={startAgain}
                />
            ) : (
                <PlayerFleet
                    availableShips={availableShips}
                    selectShip={selectShip}
                    currentlyPlacing={currentlyPlacing}
                    startTurn={startTurn}
                    startAgain={startAgain}
                />
            )}

            <PlayerBoard
                currentlyPlacing={currentlyPlacing}
                setCurrentlyPlacing={setCurrentlyPlacing}
                rotateShip={rotateShip}
                placeShip={placeShip}
                placedShips={placedShips}
                hitsByComputer={hitsByComputer}
                playSound={playSound}
            />
            <ComputerBoard
                computerShips={computerShips}
                changeTurn={changeTurn}
                gameState={gameState}
                hitComputer={hitComputer}
                hitsByPlayer={hitsByPlayer}
                setHitsByPlayer={setHitsByPlayer}
                handleComputerTurn={handleComputerTurn}
                checkIfGameOver={checkIfGameOver}
                setComputerShips={setComputerShips}
                playSound={playSound}
            />
        </section>
    );
};

import React from 'react';
import {ReplicaBox} from "./replicaBox/ReplicaBox";

export const PlayerFleet = ({
                                availableShips,
                                selectShip,
                                currentlyPlacing,
                                startTurn,
                                startAgain,
                            }) => {
    let shipsLeft = availableShips.map((ship) => ship.name);

    let shipReplicaBoxes = shipsLeft.map((shipName, shipId) => (
        <ReplicaBox
            selectShip={selectShip}
            key={shipId}
            isCurrentlyPlacing={currentlyPlacing && currentlyPlacing.name === shipName}
            shipName={shipName}
            availableShips={availableShips}
        />
    ));

    let fleet = (
        <div id="replica-fleet">
            <div>{shipReplicaBoxes}</div>
            <div>
                <p className="player-tip-b">Натисніть праву кнопку миші, щоб повернути корабель перед установкою.</p>
                <p className="restart" onClick={startAgain}>
                    Перезапуск
                </p>
            </div>
        </div>
    );

    let playButton = (
        <div id="play-ready">
            <p className="player-tip">Кораблі установлені.</p>
            <button id="play-button" onClick={startTurn}>
                Почати гру
            </button>
        </div>
    );

    return (
        <div id="available-ships">
            <div className="tip-box-title">Ваші кораблі</div>
            {availableShips.length > 0 ? fleet : playButton}
        </div>
    );
};

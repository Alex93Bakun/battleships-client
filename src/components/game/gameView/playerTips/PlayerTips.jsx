import React from 'react';

export const PlayerTips = ({
                               gameState,
                               hitsbyPlayer,
                               hitsByComputer,
                               startAgain,
                               winner,
                           }) => {
    let numberOfHits = hitsbyPlayer.length;
    let numberOfSuccessfulHits = hitsbyPlayer.filter((hit) => hit.type === 'hit').length;
    let accuracyScore = Math.round(100 * (numberOfSuccessfulHits / numberOfHits));
    let succesfulComputerHits = hitsByComputer.filter((hit) => hit.type === 'hit').length;

    let gameOverPanel = (
        <div>
            <div className="tip-box-title">Игра окончена!</div>
            <p className="player-tip">
                {winner === 'player' ? 'Ви перемогли, Адмірал! 🎉' : 'Вы програли, Адмірал 😭. Щасти у наступному бою!'}
            </p>
            <p className="перезапуск" onClick={startAgain}>
                Зіграти ще раз?
            </p>
        </div>
    );

    let tipsPanel = (
        <div>
            <div className="tip-box-title">Статистика</div>
            <div id="firing-info">
                <ul>
                    <li>{numberOfSuccessfulHits} вдачні постріли</li>
                    <li>{accuracyScore > 0 ? `${accuracyScore}%` : `0%`} точність</li>
                </ul>
                <p className="player-tip">Перемагає той, хто першим потопить усі 10 кораблів супротивника.</p>
                <p className="restart" onClick={startAgain}>
                    Почати наново
                </p>
            </div>
        </div>
    );

    return (
        <div id="player-tips">
            {numberOfSuccessfulHits === 20 || succesfulComputerHits === 20
                ? gameOverPanel
                : tipsPanel}
        </div>
    );
};

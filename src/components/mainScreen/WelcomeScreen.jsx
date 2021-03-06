import React from 'react';

const WelcomeScreen = ({startPlay}) => {
    return (
        <main>
            <h2 className="tip-box-title">Правила</h2>
            <p className="player-tip">
                Ви і ваш супротивник - конкуруючі командири флотилій. Ваші флоти розташовані на
                секретних координатах, і ви по черзі стріляєте торпедами один в одного. перший
                потопивший весь флот супротивника перемагає!
            </p>
            <button onClick={startPlay}>Грати</button>
        </main>
    );
};

export default WelcomeScreen;

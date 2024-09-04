// eslint-disable-next-line react/prop-types
export default function Header({score , highScore}) {
    return (
        <>
        <header>
            <div className="header-inner-wrapper">
                <div className="title-heading">
                    <h2>MemoryCard Game</h2>    
                </div>
                <div className="score-container">
                    <p className="score"><b>Current Score: {score}</b></p>
                    <p className="highScore"><b>High Score : {highScore}</b></p>
                </div>
            </div>
        </header>
        </>
    );
}
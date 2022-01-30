import React, {useState, useEffect, useReducer} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bowling min/max App</h1>
      </header>
      <Game />
    </div>
  );
}

export default App;

const Game = () => {
  const [frame, setFrame] = useState([])
  const [frames, setFrames] = useState([])
  const [finalScore, setFinalScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  const [minScore, setMinScore] = useState(0)
 
  const calcMaxScore = () => {
    return setMaxScore(300)
  }

  const calcMinScore = () => {

  }

  const calcFinalScore = () => {
    let score = 0
    frames.map(({ firstThrow, secondThrow, bonusThrow }, index) => {
      let frame = 0
      if (index < 8) {
        if (firstThrow === 10) {
          if (frames[index + 1].firstThrow === 10) {
            if (frames[index + 2].firstThrow >= 0) {
              frame = (firstThrow + frames[index + 1].firstThrow +frames[index + 2].firstThrow)
            }
          } else if (frames[index + 1].secondThrow >= 0) {
            frame = (firstThrow + frames[index + 1].firstThrow +frames[index + 1].secondThrow)
          }
        } else if ((firstThrow + secondThrow) === 10) {
          if (frames[index + 1].firstThrow >= 0) {
            frame = (firstThrow + secondThrow + frames[index + 1].firstThrow)
          }
        } else {
          frame = (firstThrow + secondThrow)
        }
      } else if (index === 8) {
        if (firstThrow === 10) {
          frame = (firstThrow + frames[index + 1].firstThrow + frames[index + 1].secondThrow)
        } else if ((firstThrow + secondThrow) === 10) {
          if (frames[index + 1].firstThrow >= 0) {
            frame = (firstThrow + secondThrow + frames[index + 1].firstThrow)
          }
        } else {
          frame = (firstThrow + secondThrow)
        }
      } else if (index === 9) {
        if (firstThrow > 0)
          frame += firstThrow
        
        if (secondThrow > 0)
          frame += secondThrow
            
        if (bonusThrow > 0)
          frame += bonusThrow
      }
      score += frame
    })

    setFinalScore(score)
  }
    
      
  const pinRandom = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min +1) + min)
  }

  const getRandomFrame = () => {
    const firstThrow = pinRandom(6, 10)
    let secondThrow
    let bonusThrow

    if (firstThrow !== 10 && frames.length !== 9) {
      secondThrow = pinRandom(0, 10 - firstThrow)
    } else {
      if (frames.length === 9) {
        if (firstThrow === 10) {
          secondThrow = pinRandom(6, 10)
        
          if ((secondThrow) === 10) {
            bonusThrow = pinRandom(6, 10)
          } else {
            bonusThrow = pinRandom(0, 10 - secondThrow)
          }
        } else {
          secondThrow = pinRandom(0, 10 - firstThrow)
        
          if ((firstThrow + secondThrow) === 10)
            bonusThrow = pinRandom(6, 10)
        }
      }
    }
    setFrames([...frames, {firstThrow, secondThrow, bonusThrow}])
  }

  const getRandomGame = () => {
    while (frames.length < 10)
      return getRandomFrame()
  }

  const resetGame = () => {
    setFrames([])
    setFinalScore(0)
  }
 
  useEffect(() => {
    const timer = setInterval(() => {
      if (frames.length >0) {
        getRandomGame() 
        calcFinalScore()
      }
    }, 500)
    
    return () => clearInterval(timer)
  }, [frames])



  return (
    <div>
      <h3>Game</h3>
      <div>
        <p><button onClick={()=>calcFinalScore()}>Final score</button> {finalScore}</p>
        <p>Minimum score: {minScore}</p>
        <p>Maximum score: {maxScore}</p>
        <button onClick={()=>getRandomGame()}>click to mimic game</button>
      </div>
      <div> 
        <div>{frame.length}
            {!!frames && (
              frames.map(({firstThrow, secondThrow, bonusThrow}, index) => (
                <div key={index}>
                  Frame {index + 1}: {firstThrow}
                  {secondThrow >= 0 && ` :  ${secondThrow}`}
                  {bonusThrow >= 0 && ` - ${bonusThrow}`}
                  {frame.length > 0 && ` total: ${frame[index]}`}
                </div>
              ))
            )}
        </div>
        <button onClick={()=>resetGame()}>reset game</button>
      </div>
    </div>
  )
}



//<img src={"../public/logo192.png"} className="App-logo" alt="bowling logo" />
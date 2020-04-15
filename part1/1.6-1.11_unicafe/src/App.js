import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = ({type, feedback}) => {
  return (
    <>
      <p>{type} {feedback}</p>
    </>
  );
}

const Statistics = (props) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td><Statistic type='Good' /></td>
            <td><Statistic feedback={props.pGood} /></td>
          </tr>
          <tr>
            <td><Statistic type='Neutral' /></td>
            <td><Statistic feedback={props.pNeutral} /></td>
          </tr>
          <tr>
            <td><Statistic type='Bad' /></td>
            <td><Statistic feedback={props.pBad} /></td>
          </tr>
          <tr>
            <td><Statistic type='All' /></td>
            <td><Statistic feedback={props.pAllClicks} /></td>
          </tr>
          <tr>
            <td><Statistic type='Average' /></td>
            <td><Statistic feedback={props.pAllFeed / props.pAllClicks} /></td>
          </tr>
          <tr>
            <td><Statistic type='Positive' /></td>
            <td><Statistic feedback={(props.pGood * 100 / props.pAllClicks) + "%"} /></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeed, setAllFeed] = useState(0)
  const [allClicks, setAllClicks] = useState(0)

  const handleGoodClick = () => {
    setAllClicks(allClicks + 1)
    setAllFeed(allFeed + 1)
    setGood(good + 1)
    console.log('goodClicks', good + 1) // for debugging purposes
    console.log('neutralClicks', neutral) // for debugging purposes
    console.log('badClicks', bad) // for debugging purposes
    console.log('allClicks', allClicks + 1) // for debugging purposes
  }
  
  const handleNeutralClick = () => {
    setAllClicks(allClicks + 1)
    setNeutral(neutral + 1)
    console.log('goodClicks', good) // for debugging purposes
    console.log('neutralClicks', neutral + 1) // for debugging purposes
    console.log('badClicks', bad) // for debugging purposes
    console.log('allClicks', allClicks + 1) // for debugging purposes
  }

  const handleBadClick = () => {
    setAllClicks(allClicks + 1)
    setAllFeed(allFeed - 1)
    setBad(bad + 1)
    console.log('goodClicks', good) // for debugging purposes
    console.log('neutralClicks', neutral) // for debugging purposes
    console.log('badClicks', bad + 1) // for debugging purposes
    console.log('allClicks', allClicks + 1) // for debugging purposes
  }

  if (allClicks === 0) {
    return (
      <div>
        <div>
          <h1>Give feedback</h1>
          <Button onClick={handleGoodClick} text='Good' />
          <Button onClick={handleNeutralClick} text='Neutral' />
          <Button onClick={handleBadClick} text='Bad' />
          <h1>Statistics</h1>
          <p>No feedback given</p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div>
        <h1>Give feedback</h1>
        <Button onClick={handleGoodClick} text='Good' />
        <Button onClick={handleNeutralClick} text='Neutral' />
        <Button onClick={handleBadClick} text='Bad' />
        <h1>Statistics</h1>
        <Statistics pGood={good} pNeutral={neutral} pBad={bad} pAllClicks={allClicks} pAllFeed={allFeed}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

export default App
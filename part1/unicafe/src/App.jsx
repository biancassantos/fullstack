import { useState } from "react"

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad, all, total }) => {
  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={total / 3} />
      <StatisticLine text="positive" value={`${(good / all) * 100}%`} />
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const all = good + neutral + bad

  const handleClickGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setTotal(total - 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button text="good" onClick={handleClickGood} />
        <Button text="neutral" onClick={handleClickNeutral} />
        <Button text="bad" onClick={handleClickBad} />
      </div>
      <h2>statistics</h2>
      <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      total={total}
      />
    </div>
  )
}

export default App
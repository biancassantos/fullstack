import { useState } from "react"

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))

  const handleClick = () => {
    const min = 0
    const max = anecdotes.length - 1
    const number = Math.floor(Math.random() * (max - min + 1) ) + min
    setSelected(number)
  }

  const handleClickVote = (n) => {
    const copy = [...votes]
    copy[n] += 1
    setVotes(copy)
  }

  const mostVotes = () => {
    let most = 0
    let mostIndex;

    votes.forEach((vote, index) => {
      if (vote > most) {
        most = vote
        mostIndex = index
      }
    })

    return mostIndex
  }

  const mostVotesIndex = mostVotes()

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => handleClickVote(selected)}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotesIndex]}</p>
      <p>has {votes[mostVotesIndex]} votes</p>
    </div>
  )
}

export default App

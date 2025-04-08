import { useState, useEffect } from 'react'
import peopleService from "./services/people"
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [search, setSearch] = useState("")
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const filteredList = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  let listToShow = search == "" ? persons : filteredList

  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null)
    }, 2000);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personExists = persons.find(({name}) => name === newName)
    
    if (personExists) {
      const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (answer) {
        const updatedPerson = {...personExists, number: newNumber}
        peopleService
          .updateNumber(updatedPerson.id, updatedPerson)
          .then(returnedPerson => console.log(returnedPerson))
          .catch(error => {
            setMessage(error.response.data.error)
            setIsError(true)
            clearMessage()
          })
      }

    } else {
      const newPerson = {name: newName, number: newNumber}
      peopleService
        .create(newPerson)
        .then(returnedPerson => console.log(returnedPerson))
        .catch(error => {
          setMessage(error.response.data.error)
          setIsError(true)
          clearMessage()
        })
      setMessage(`Added ${newName}`)
      clearMessage()
    }
    
    setNewName("")
    setNewNumber("")
  }

  useEffect(() => {
    peopleService
      .getAll()
      .then(people => setPersons(people))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} />
      <Filter setSearch={setSearch} />

      <h2>Add a new</h2>
      <PersonForm
      handleSubmit={handleSubmit}
      newName={newName}
      newNumber={newNumber}
      setNewName={setNewName}
      setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons listToShow={listToShow} />
    </div>
  )
}

export default App
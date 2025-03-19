import peopleService from "./services/people"

const Person = ({ name, number, id }) => {
  const handleDelete = () => {
    const answer = window.confirm(`Delete ${name}?`)
    if (answer) {
      peopleService
        .deletePerson(id)
        .then(() => console.log("Deleted"))
    }
  }

  return (
    <div>
      <span>
        {name} {number}
      </span> 
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Persons = ({ listToShow }) => {
  return (
    <>
      {listToShow.map(person => {
        return <Person 
        key={person.id} 
        id={person.id} 
        name={person.name} 
        number={person.number} 
        />
      })}
    </>
  )
}

export default Persons
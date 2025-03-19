const Filter = ({ setSearch }) => {
  return (
    <div>
      filter shown with <input onChange={e => setSearch(e.target.value)} />
    </div>
  )
}

export default Filter
const Notification = ({ message, isError }) => {
  const messageStyle = {
    backgroundColor: "lightgray",
    color: isError ? "red" : "green",
    fontSize: 20,
    borderStyle: "solid",
    borderColor: isError ? "red" : "green",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export default Notification
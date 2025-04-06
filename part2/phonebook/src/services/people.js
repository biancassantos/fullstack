import axios from "axios";

const baseUrl = "/api/persons"

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async (newPerson) => {
  const request = await axios.post(baseUrl, newPerson)
  return request.data
}

const deletePerson = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`)
  return request.data
}

const updateNumber = async (id, updatedPerson) => {
  const request = await axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.data
}

export default { getAll, create, deletePerson, updateNumber }
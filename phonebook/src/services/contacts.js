import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    name: 'This note is not saved to server',
    number: '601512398',
  }
  return request.then(response => response.data.concat(nonExisting))
  //return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
}

export default { getAll, create, update, deletePerson }
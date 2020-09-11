import axios from 'axios'

export const getTodoList = (params) => {
  return axios.get('/todo/list', {
    params: params
  })
}

export const addTodo = (params) => {
  return axios.post('/todo/list', params)
    .then(res => {
      return res.data
    })
}

export const getTodo = params => {
  return axios.get('/todo/listId', {
    params: params
  })
}

export const addRecord = params => {
  return axios.post('/todo/addRecord', params).then(res => res.data)
}

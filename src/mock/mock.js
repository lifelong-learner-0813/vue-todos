import axios from 'axios'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'
import {Todos} from './data/todoList'

export default {
  start() {
    let mock = new MockAdapter(axios)

    mock.onGet('/todo/list').reply(config => {
      let mockTodo = Todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          count: todo.record.filter(data => {
            if (data.checked === false) return true
            return false
          }).length,
          locked: todo.locked,
          isDelete: todo.isDelete
        }
      }).filter(todo => {
        return todo.isDelete !== true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: mockTodo
          }], 200)
        })
      })
    })

    mock.onPost('/todo/addTodo').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200])
        }, 200)
      })
    })
  }
}

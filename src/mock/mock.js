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
          }])
        }, 200)
      })
    })

    mock.onGet('todo/listId').reply(config => {
      let {id} = config.params
      let todo = Todos.find(todo => {
        return id && todo.id === id
      })
      todo.count = todo.record.filter(data => {
        return data.checked === false
      }).length
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todo: todo
          }])
        }, 200)
      })
    })

    mock.onPost('/todo/list').reply(config => {
      Todos.push({
        id: Mock.Random.guid(),
        title: 'newList',
        isDelete: false,
        locked: false,
        record: []
      })
      console.log(Todos)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            todos: Todos
          }])
        }, 200)
      })
    })

    mock.onPost('/todo/addRecord').reply(config => {
      let {id, text} = JSON.parse(config.data)
      Todos.some()
    })
  }
}

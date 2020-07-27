import axios from 'axios'
import Mock from 'mock'
import MockAdapter from 'axios-mock-adapter'
import {Todos} from './data/todoList'

export default {
  start(){
    let mock = new MockAdapter(axios)
    mock.onGet('/todo/list').reply(config => {
      let mockTodo = Todos.map(todo => {
        return {
          id: todo.id,


        }
      })
    })
  }
}

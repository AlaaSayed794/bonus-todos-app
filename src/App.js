import React, { Component } from 'react';
import "./App.css"
import Todos from './components/Todos'
import AddTodo from './components/AddTodo';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getTodos()
  }
  render() {
    const view = this.state.loading ? <h1>loading</h1> : <Todos editTodo={this.editTodo} delTodo={this.delTodo} todos={this.state.todos} />
    return (
      <div className='App'>
        <h1> Todos App</h1>
        <AddTodo addTodo={this.addTodo} />
        {view}
      </div>
    );
  }

  editTodo = (id, completed) => {
    fetch('todos/' + id, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: !completed })
    }).then(res => res.json).then(() => this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id == id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    }))
  }

  addTodo = (title) => {
    fetch('todos/', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    }).then(res => res.json()).then((newTodo) => {
      this.setState({
        todos: [...this.state.todos, newTodo]
      })
    })
  }
  delTodo = (id) => {
    const tempTodo = this.state.todos.find(todo => todo.id == id)
    this.setState({
      todos: this.state.todos.filter(todo => todo.id != id)
    })
    fetch('todos/' + id, {
      method: "DELETE"
    }).then(res => {
      if (res.status != 204) {
        this.setState({ todos: [...this.state.todos, tempTodo] })
      }
    })
  }

  async getTodos() {

    const res = await fetch('/todos')
    const todos = await res.json()

    this.setState({
      todos,
      loading: false
    })
  }
}



export default App;

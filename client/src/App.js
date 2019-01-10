import React, { Component } from 'react';
import './App.css';

import Button from './components/Button';
import Input from './components/Input';
import List from "./components/List";
import ListItem from "./components/ListItem";
import Form from "./components/From";
import axios from 'axios';

class App extends Component {
  state = {
    todos: [],
  }

  getTodosHandler = () => {
    fetch("/api")
      .then(res => res.json())
      .then(res => this.setState({todos: res}));
  }

  addTodoHandler = (e) => {
    const message = e.target.value;
    if (message) {
      axios.post("/api", {
        text: message
      });
    }
  }

  deleteTodoHandler = id => {
    let todos = [...this.state.todos];
    const index = todos.findIndex(todo => todo._id === id);
    todos.splice(index, 1);
    this.setState({ todos });

    axios.delete("/api/delete/" + id, {
      data: {
        _id: id
      }
    });
  };

  getTodoToUpdate = id => {
    let todos = [...this.state.todos];
    const input = document.getElementById("updateTodo");
    todos.find(todo => {
      if (todo._id === id ) {
        input.value = todo.message;
        input.name = todo._id;
      }
    }) 
  };

  updateTodoHandler = () => {
    const textField = document.getElementById("updateTodo");
    const updatedText = textField.value;
    const id = textField.name;
    
    updatedText
      ? axios.post("/api/update/" + id, {
          _id: id,
          text: updatedText
        })
      : alert("Nothing to update!");
  };

  componentDidMount () {
    this.getTodosHandler();
  }

  render() {
    const todos = [...this.state.todos];
    return (
      <div className="App">
        <Form action="/">
          <Input 
            id="newTodo" 
            onBlur={this.addTodoHandler}
          ></Input>
          <Button 
            id="addBtn" 
            clicked={this.getTodosHandler}
          >
            Add
          </Button>
        </Form>
        <Form action="/">
          <Input 
            id="updateTodo"
            onBlur={this.updateTodoHandler}
          >
          </Input>
          <Button 
            id="updateBtn" 
            clicked={this.getTodosHandler}
          >
            Update
          </Button>
        </Form>
        {!todos 
          ? <h1>No Added Todos yet!</h1>
          : <List id="todosList">
              {todos.map(todo => (
                <ListItem 
                  id={todo._id} 
                  key={todo._id}
                >
                  {todo.message}
                  <Button
                    id="editBtn"
                    clicked={() => this.getTodoToUpdate(todo._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    id="delBtn"
                    clicked={() => this.deleteTodoHandler(todo._id)}
                  >
                    X
                  </Button>
                </ListItem>
              ))}
          </List>}
      </div>
    );
  }
}

export default App;
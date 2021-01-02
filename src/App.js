import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoListTemplate from './components/TodoListTemplate';
import Palette from './components/Palette';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

const GlobalStyle = createGlobalStyle`


body{
  margin:0;
  padding:0;
  font-family: sans-serif;
  background: #e9ecef;
}
`;

class App extends Component {

  id = 3

  state = {
    input: '',
    todos: [],
    color: '#343a40'
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: '',
      todos: todos.concat({ // push 대신 concat을 사용하는 이유 : push랄 사용하면 추가된 배열과 이전의 배열을 비교할 수 없다. 즉, 최적화 할 수 없다.
        id: this.id++,
        text: input,
        checked: false
      })
    });
    localStorage.todo = JSON.stringify(todos)
    console.log(todos)
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];

    //배열을 업데이트 할 때는 배열의 값을 직접 수정하면 절대 안됨!
    //복잡도는 O(n)정도로 오버헤드가 발생하지 않음
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleColors = (e) => {
    const { color } = this.state;
    const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];
    this.setState({
      color: colors[Number(e.target.className)]
    })
  }

  /*
  constructor(props) {
    super(props);
    let { todos, id } = this.state;
    const todoData = JSON.parse(localStorage.todo);
    this.State = {
      input: '',
      todos: todoData,
      color: '#343a40'
    }
    console.log(this.state)
    console.log(todoData, this.state.todos)
  }
  */

  render() {
    const { input, todos, color } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleColors
    } = this; // this.handleChange, this.handleCreate, this.handleKeyPress 이런식의 작업을 생략할 수 있다.

    return (
      <>
        <GlobalStyle />
        <TodoListTemplate form={(
          <Form
            value={input}
            color={color}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />
        )} palette={<Palette color={color} onColorClick={handleColors} />}>
          <TodoItemList todos={todos} color={color} onToggle={handleToggle} onRemove={handleRemove} />
        </TodoListTemplate>
      </>
    );
  }
}

export default App;

/* React Component구현 방법 :
  컴포턴트 DOM 태그 작성, CSS스타일 작성 -> 상태관리 및 props로 필요한 값 전달 */
/* ‘리스트’ 를 렌더링하게 될 때(특히 보여주는 리스트가 동적인 경우) :
  함수형이 아닌 클래스형 컴포넌트로 작성한다. 클래스형 컴포넌트로 작성해야 나중에 컴포넌트 성능 최적화를 할 수 있기 때문이다. */
/* 상태관리시 :
  컴포넌트끼리 데이터를 직접(ref를 사용해서) 전달하는것이 아니고,
  반드시 부모를 통하여 전달한다.*/
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';

class App extends Component {

  id = 3

  state = {
    input: '',
    todos: [
      { id: 0, text=' 리액트 소개', checked: false },
      { id: 1, text=' 리액트 소개', checked: true },
      { id: 2, text=' 리액트 소개', checked: false },
    ]
  }
  render() {
    return (
      <TodoListTemplate form={<Form />}>
        <TodoItemList />
      </TodoListTemplate>
    );
  }
}

export default App;

{/* React Component구현 방법 : 
  컴포턴트 DOM 태그 작성, CSS스타일 작성 -> 상태관리 및 props로 필요한 값 전달 */}
{/* ‘리스트’ 를 렌더링하게 될 때(특히 보여주는 리스트가 동적인 경우) : 
  함수형이 아닌 클래스형 컴포넌트로 작성한다. 클래스형 컴포넌트로 작성해야 나중에 컴포넌트 성능 최적화를 할 수 있기 때문이다. */}
{/* 상태관리시 : 
  컴포넌트끼리 데이터를 직접(ref를 사용해서) 전달하는것이 아니고, 
  반드시 부모를 통하여 
 */}
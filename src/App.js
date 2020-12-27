import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form'

class App extends Component {
  render() {
    return (
      <TodoListTemplate form={<Form />}>
        템플릿 완성
      </TodoListTemplate>
    );
  }
}

export default App;

{/*
React Component구현 방법 : 
  컴포턴트 DOM 태그 작성, CSS스타일 작성 -> 상태관리 및 props로 필요한 값 전달
*/}
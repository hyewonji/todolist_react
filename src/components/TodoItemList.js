import React, { Component } from 'react'
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    render() {
        const { todos, onToggle, onRemove } = this.props;

        const todoList = todos.map(
            ({ id, text, checked }) => (
                <TodoItem
                    /*  id, text, checked를 직접 넣어주는 대신, 
                        todos.map((todo)=>(<TodoItem {...todo}/>))를 이용하면 내부 값들이 모두 자동으로 props로 설정이 된다. */
                    id={id}
                    text={text}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id} //배열을 렌더링 할 때는, key값이 꼭 있어야 한다.
                />
            )
        );
        return (
            <div>
                {todoList}
            </div>
        )
    }
}

export default TodoItemList;
import React, { Component } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
    //background: gray; /* 사이즈 조정이 잘 되고 있는지 확인하기 위한 임시 스타일 */
`;

class TodoItemList extends Component {
    // shouldComponentUpdate : 컴포넌트의 리렌더링 여부를 정해줌(기본값 : true)
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }

    render() {
        const { todos, color, onToggle, onRemove } = this.props;

        const todoList = todos.map(
            ({ id, text, checked }) => (
                <TodoItem
                    /*  id, text, checked를 직접 넣어주는 대신, 
                        todos.map((todo)=>(<TodoItem {...todo}/>))를 이용하면 내부 값들이 모두 자동으로 props로 설정이 된다. */
                    id={id}
                    text={text}
                    color={color}
                    checked={checked}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id} //배열을 렌더링 할 때는, key값이 꼭 있어야 한다.
                />

            )
        );

        return (
            <TodoListBlock>
                <TodoItem text="프로젝트 생성하기" done={true} />
                <TodoItem text="컴포넌트 스타일링 하기" done={true} />
                <TodoItem text="Context 만들기" done={false} />
                <TodoItem text="기능 구현하기" done={false} />
            </TodoListBlock>
        )
    }
}

export default TodoItemList;
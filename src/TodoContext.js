import React, { createContext, useReducer } from 'react';

const initialTodos = [
    {
        id: 1,
        text: '프로젝트 생성하기',
        done: true
    },
    {
        id: 2,
        text: '컴포넌트 스타일링하기',
        done: true
    },
    {
        id: 3,
        text: 'Context 만들기',
        done: false
    },
    {
        id: 4,
        text: '기능 구현하기',
        done: false
    },
]

function todoReducer(state, action){
    switch (action.type){
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? {...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// state와 dispatch를 Context를 통해 다른 컴포넌트에서 바로 사용할 수 있게 해준다.
// 두개의 Context를 만들어 각각 넣어준다.
// dispatch만 필요한 컴포넌트에서 불필요한 렌더링을 방지할 수 있다.
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();


//Context에서 사용할 값을 지정할 때는 Provider 컴포넌트를 렌더링 하고 value를 설정해준다.
export function TodoProvider({ children }){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    return (
    <TodoStateContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
            {children}
        </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
    );
}


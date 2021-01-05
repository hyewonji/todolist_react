import React, { createContext, useContext, useReducer, useRef } from 'react';

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


/*  state와 dispatch를 Context를 통해 다른 컴포넌트에서 바로 사용할 수 있게 해준다.
    두개의 Context를 만들어(`React.createContext(null)`) 각각 넣어준다.
    dispatch만 필요한 컴포넌트에서 불필요한 렌더링을 방지할 수 있다.  */
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();


/*  Context를 만들면, Context안에 Provider이라는 컴포넌트를 통해 Context의 값을 정할 수 있다.
    Context에서 사용할 값을 지정할 때는 Provider 컴포넌트를 렌더링 하고 value를 설정해준다.
    이렇게 설정하면 Provider에 의해 감싸진 컴포넌트 중 어디서든지 Contaxt의 값을 다른 곳에서 바로 조회해서 사용 할 수 있다.  */
/*  useState 대신 useReducer사용하는 이유 : 
    dispatch를 Context API를 사용해 전역적으로 사용 할 수 있게 해주면, 컴포넌트에게 함수를 전달해야 하는 상황에서 코드의 구조가 훨씬 깔끔해질 수 있다.
    따라서, 컴포넌트에게 여러 컴포넌트를 거쳐 함수를 전달해야 하는 일이 있다면 Context API를 사용한다.  */
export function TodoProvider({ children }){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
    <TodoStateContext.Provider value={state}>
        <TodoDispatchContext.Provider value={dispatch}>
            <TodoNextIdContext.Provider value={nextId}>
                {children}
            </TodoNextIdContext.Provider>
        </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
    );
}


//  useContext를 컴포넌트에서 직접 사용하는 대신에, useContext를 사용하는 커스텀 Hook을 만들어 내보내준다.
export function useTodoState(){
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch(){
    const context = useContext(TodoDispatchContext);
    if(!context){
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
/*  inpu같은 관리할 때마다 꽤 비슷한 코드가 반복되는 상황에서는, `커스텀 Hooks`를 만들어 반복되는 로직을 쉽게 재사용한다.
    Hooks : useState, useEffect, useReducer, useCallback 등  */
/*  커스텀 Hooks를 사용하려면 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링 되어있어야 한다.  */

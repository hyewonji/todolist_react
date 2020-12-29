import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.checked !== nextProps.checked;
    }

    render() {
        const { text, color, checked, id, onToggle, onRemove } = this.props;
        const style = {
            color: color
        }

        return (
            <div className="todo-item" onClick={() => onToggle(id)}>
                <div className="remove" onClick={(e) => {
                    e.stopPropagation(); // DOM의 부모의 클릭 이벤트에 연결되어 있는 onToggle이 실행되지 않도록 함
                    onRemove(id)
                }/* onClick = {onToggle{id}}와 같은 형식으로 하면 절대 안된다!!
                    이렇게 하면, 해당 함수가 렌더링 될 때 호출되기 때문에 데이터 변경이 되고, 데이터 변경이 되면 또 리렌더링이 되면서 이 과정이 무한반복 됨.*/
                }>&times;</div>
                <div className={`todo-text ${checked ? ' checked' : ''}`}>
                    {/*classnames('todo-text',{checked} 로도 작성 할 수 있다.*/}
                    <div style={style}>{text}</div>
                </div>
                {
                    checked && (<div className="check-mark">✓</div>)
                }
            </div>
        );
    }
}

export default TodoItem;

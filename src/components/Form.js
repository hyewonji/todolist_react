import React from 'react';
import './Form.css';

/* Form 기능 : 
    1. 텍스트 내용 바뀌면 state 업데이트
    2. 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
    3. 인풋에서 Enter누르면 버튼 클릭한것과 동일한 작업 진행 */
const Form = ({ value, color, onChange, onCreate, onKeyPress }) => {
    const style = {
        color: color
    }
    return (
        <div className="form">
            <input value={value} style={style} onChange={onChange} onKeyPress={onKeyPress} /> {/*onKeyPress : 특정키에 대한 기능 설정*/}
            <div className="create-button" onClick={onCreate}>
                추가
            </div>
        </div>
    );
};

export default Form;
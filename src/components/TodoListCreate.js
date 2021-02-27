import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover{
        background: #63e6be;
    }
    &:active{
        background:#20c997;
    }

    z-index: 5;
    cursor: pointer;
    width: 80px;
    height: 80px;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content:center;

    transition: 0.125s all ease-in;
    ${props =>
        props.open &&
        css`
        background: #ff6b6b;
        &:hover {
        background: #ff8787;
        }
        &:active {
            background: #fa5252;
        }
        transform: translate(-50%, 50%) rotate(45deg);
        `}
`;

const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`;

const InsertForm = styled.form`
    background: #F7F8F9;
    padding: 0px 32px 72px 32px;
    border-radius: 0 0 16px 16px;
    border-top: 1px solid #e9ecef;
`

const Input = styled.input`
    padding: 12px;
    border-radius: 4px;
    border: 1px solid #dee2e6;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
    color: ${props => props.color};
`

const PaletteForm = styled.div`
    width:100%;
    padding: 5px 0;
    display: flex;
    justify-content: center;
`

const Palettecolor = styled.div`
    width: 30px;
    height: 30px;
    margin: 10px;
    background: ${props => props.color};
    cursor:pointer;
`

function TodoListCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [nowColor, setNowColor] = useState("black")

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value)
    const onColor = (e) => {
        const color = e.target.id;
        setNowColor(color);
    }
    const onSubmit = e => {
        e.preventDefault();//새로고침 방지
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false
            }
        });
        setValue('');
        setOpen(false);
        nextId.current += 1;
    }

    const Palette = ['rgb(65, 65, 65)',' #ff9c9c','#8ad3b8',' #86bbf0']

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <PaletteForm>
                            <Palettecolor onClick={onColor} id={Palette[0]} color={Palette[0]}></Palettecolor>
                            <Palettecolor onClick={onColor} id={Palette[1]} color={Palette[1]}></Palettecolor>
                            <Palettecolor onClick={onColor} id={Palette[2]} color={Palette[2]}></Palettecolor>
                            <Palettecolor onClick={onColor} id={Palette[3]} color={Palette[3]}></Palettecolor>
                        </PaletteForm>
                        <Input 
                        autoFocus 
                        placeholder="할 일을 입력 후, Enter를 누르세요"
                        onChange={onChange}
                        value={value}
                        color={nowColor}
                        />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd />
            </CircleButton>
        </>
    );
}

/*  React.memo로 감싸줘서 
    TodoContext에서 관리하고 있는 state가 바뀔 때 TodoCreate의 불필요한 리렌더링 방지  
    TodoContext에서 Context를 각각 만들어 줬기 때문에 가능하다.  */
export default React.memo(TodoListCreate);

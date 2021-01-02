import React from 'react';
import styled from 'styled-components';
//import './TodoListTemplate.css';

const TodoListTemplateBlock = styled.div`
  width: 512px;
  height: 568px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;


const TodoListTemplate = ({ form, children, palette }) => {
    return (
        <>
            <TodoListTemplateBlock>
                <main className="todo-list-template">
                    <div className="title">
                        오늘 할 일
            </div>
                    <section className="palette-wrapper">
                        {palette}
                    </section>
                    <section className="form-wrapper">
                        {form}
                    </section>
                    <section className="todos-wrapper">
                        {children}
                    </section>
                </main>
            </TodoListTemplateBlock>
        </>
    );
};

export default TodoListTemplate;
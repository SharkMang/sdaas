import React, { useMemo, useState, useRef } from "react";
import { isValidTodo } from "../utils/validation";
import Checkbox from "./Checkbox";

const Header = ({ addTodo, eventChangeCheckForAllTodos, isActive, checkedHeaderChackbox }) => {
  
  const [todo, setInputTodo] = useState('');
  const [error, setError] = useState('')
  const inputPlaseholder = useMemo(() => {
    return error || 'What needs to be done?'
  }, [error])
  const inputTodo = useRef(null)

  const headerCheckboxClassName = useMemo(() => `header-chackbox ${isActive ? '' : 'not-active'}`, [isActive])

  const handlerOnChangeInput = (e) => {
    setInputTodo(e.target.value);
  }

  const eventEnterTodo = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      setInputTodo('');

      if (isValidTodo(event.target.value)) {
        addTodo(event.target.value);

        setError('');
      } else {
        setError('Incorrect Value');
        inputTodo.current.focus();
      }
    }
  }

  return (
    <header className='header'>
      <h1 className='h1'>
        Todos
      </h1>
      <Checkbox className={headerCheckboxClassName} checked={checkedHeaderChackbox} onChange={eventChangeCheckForAllTodos}/>
      <input 
        className='header-input' 
        type='text' 
        placeholder={inputPlaseholder} 
        value={todo}
        onChange={handlerOnChangeInput}
        onKeyDown={eventEnterTodo}
        onBlur={() => {setInputTodo('')}}
        ref={inputTodo}
      />
    </header>
  );
}

export default React.memo(Header);
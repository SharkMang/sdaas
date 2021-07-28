import React, { useState, useMemo} from 'react';
import { isValidTodo } from '../utils/validation';

const InputChangeNameTodo = ({changeTodoName, blurInputTodoName, todo}) => {
  const [newTodo, setInputTodo] = useState(todo.todoName);
  const [error, setError] = useState('');

  const inputPlaseholder = useMemo(() => {
    return error
  }, [error])

  const handlerOnChangeInput = (e) => {
    setInputTodo(e.target.value);
  }

  const eventEnterTodo = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();

      setInputTodo('')
      
      if (isValidTodo(event.target.value)) {
        changeTodoName(event.target.value, todo.id);
        setError('');
      } else {
        setError('Incorrect Value');
        inputTodo.current.focus();
      }
    }
  }

  return (
    <input 
      type='text' 
      className='input-change-name-todo'
      value={newTodo}
      placeholder={inputPlaseholder}
      onChange={handlerOnChangeInput}
      onKeyDown={eventEnterTodo}
      onBlur={() => {blurInputTodoName(todo.id)}}
      autoFocus
    />
  );
}

export default React.memo(InputChangeNameTodo);
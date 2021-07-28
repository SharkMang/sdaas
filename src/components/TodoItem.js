import React, { useMemo } from 'react';
import Button from './Button';
import Checkbox from './Checkbox';
import InputChangeNameTodo from './InputChangeNameTodo';

const TodoItem = ({ todo, removeTodo, changeTodoCheckbox, changeTodoName, eventDbClickOnTodo, blurInputTodoName }) => {

  let todoItem;
  if (todo.editing) {
    todoItem = (
      <InputChangeNameTodo 
        changeTodoName={changeTodoName} 
        blurInputTodoName={blurInputTodoName}
        todo={todo}
      />
    );
  } else {
    const todoClassName = useMemo(() => `todo-not-checked ${todo.isChecked ? 'todo-checked' : ''}`, [todo.isChecked]);

    todoItem = (
      <label className={todoClassName} onDoubleClick={() => eventDbClickOnTodo(todo.id)}>
        {todo.todoName}
      </label>
    );
  }


  return (
    <li className='todo-item'>
      <div className='todo-box' id={todo.id}>
        <Checkbox className={'todo-checkbox'} checked={todo.isChecked} onChange={() => changeTodoCheckbox(todo.id)}/>
        {todoItem}
        <Button className={'todo-button-del'} label={'X'} onClick={() => removeTodo(todo.id)}/>
      </div>
    </li>
  );
}

export default React.memo(TodoItem);
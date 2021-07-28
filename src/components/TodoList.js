import React, { memo } from "react";
import TodoItem from "./TodoItem.js";

const TodoList = ({ todos,  removeTodo, changeTodoCheckbox, changeTodoName, eventDbClickOnTodo, blurInputTodoName }) => {
 
  return (
    <section>
      <ul className='todo-list-section'>
        {todos.map(todo => 
          <TodoItem 
            todo={todo} 
            key={todo.id}  
            removeTodo={removeTodo} 
            changeTodoCheckbox={changeTodoCheckbox} 
            changeTodoName={changeTodoName} 
            eventDbClickOnTodo={eventDbClickOnTodo}
            blurInputTodoName={blurInputTodoName}
          />)}
      </ul>
    </section>
  );
}

export default React.memo(TodoList)
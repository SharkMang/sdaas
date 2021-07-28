import React, {useCallback, useEffect, useMemo, useState } from 'react';

import Header from '../src/components/Header.js';
import TodoList from '../src/components/TodoList.js';
import Navigator from '../src/components/NavPanel.js';
import Footer from '../src/components/Footer.js';
import Button from '../src/components/Button.js';

const ITEMS_PER_PAGE = 6

const todoList = [
  {
    todoName: 'first',
    isChecked: false,
    id: 10,
    editing: false
  },
  {
    todoName: 'second',
    isChecked: false,
    id: 11,
    editing: false
  },
];

const Home = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('all');
  const [todos, setTodos] = useState(todoList);

  // useEffect(() => {
  //   fetch('http://localhost:3000/private/todos')
  //       .then(response => response.json())
  //       .then(result => console.log(result))
  // }, [])


  const countOfNotComplitedTodos = useMemo(() => { 
    let count = todos.length;
    for(let i = 0; i < todos.length; i++) {
      if (todos[i].isChecked) {
        count--;
      }
    }
    return count;
  }, [todos]);

  const totalPagesCount = useMemo(() => {
    let filteredTodos = [].concat(todos);
    
    if (filterValue === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.isChecked);
    } else if (filterValue === 'complited') {
      filteredTodos = filteredTodos.filter(todo => todo.isChecked);
    }

    let totalPagesCount = Math.trunc(filteredTodos.length / ITEMS_PER_PAGE) + 1;

    if (filteredTodos.length % ITEMS_PER_PAGE === 0 && totalPagesCount !== 1) {
      totalPagesCount--;
    }

    return totalPagesCount;
  }, [todos, filterValue]);

  const currentPageTodos = useMemo(() => {
    const passedItemsCount = (currentPage - 1) * ITEMS_PER_PAGE;
    let filteredTodos = [].concat(todos);
    
    if (filterValue === 'active') {
      filteredTodos = filteredTodos.filter(todo => !todo.isChecked);
    } else if (filterValue === 'complited') {
      filteredTodos = filteredTodos.filter(todo => todo.isChecked);
    }
    
    return filteredTodos.slice(passedItemsCount, passedItemsCount + ITEMS_PER_PAGE)
  }, [todos, currentPage, filterValue]);

  const checkedHeaderChackbox = useMemo(() => {
    if (countOfNotComplitedTodos === 0 && todos.length !== 0) {
      return true;
    } else {
      return false;
    }
  }, [countOfNotComplitedTodos]);

  const isActiveHeaderChackbox = useMemo(() => (todos.length ? true : false), [todos.length])

  const isActiveFooterBtnDelAll = useMemo(() => {
    
    if (countOfNotComplitedTodos === todos.length || todos.length === 0) {
      return false
    } else {
      return true
    }
  }, [countOfNotComplitedTodos, todos.length])




  const eventChangeCheckForAllTodos = (e) => {
    setTodos(todos.map(todo => {
      if (e.target.checked){
        todo.isChecked = true
      } else {
        todo.isChecked = false
      }
      return todo
    }))
  };

  const addTodo = (todo) => {
    const newTodo = {
      todoName: todo,
      isChecked: false,
      id: Math.round(Math.random() * 10000),
      editing: false
    };
    
    if (filterValue !== 'all') {
      setFilterValue('all');
    }

    setTodos(todos.concat(newTodo));
  };

  const changeTodoCheckbox = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked
      }
      return todo;
    }));
  };

  const eventDbClickOnTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.editing = true
      }
      return todo;
    }));
  };

  const changeTodoName = (newTodoName, id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.todoName = newTodoName
        todo.editing = false
      }
      return todo;
    }));
  };

  const blurInputTodoName = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.editing = false
      }
      return todo;
    }));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  };

  const eventClickOnPage = (navId) => {
    setCurrentPage(navId);
  }

  const eventClickOnFilter = (filter) => {
    setFilterValue(filter);
  };

  const eventRemoveAllChecked = () => {
    setTodos(todos.filter(todo => !todo.isChecked))
  };

  function Logout () {
    localStorage.setItem('isAuthenticated', false);
    window.location.reload();
  }

  return (
    <>
      <Header 
        addTodo={addTodo} 
        eventChangeCheckForAllTodos={eventChangeCheckForAllTodos} 
        checkedHeaderChackbox={checkedHeaderChackbox} 
        isActive={isActiveHeaderChackbox}
      />
      <TodoList 
        todos={currentPageTodos} 
        removeTodo={removeTodo} 
        changeTodoCheckbox={changeTodoCheckbox} 
        changeTodoName={changeTodoName}
        eventDbClickOnTodo={eventDbClickOnTodo}
        blurInputTodoName={blurInputTodoName}
      />
      <Navigator 
        totalPages={totalPagesCount}
        currentPage={currentPage}
        eventClickOnPage={eventClickOnPage}
      />
      <Footer 
        notComplitedTodo={countOfNotComplitedTodos} 
        filterValue={filterValue} 
        eventClickOnFilter={eventClickOnFilter} 
        eventRemoveAllChecked={eventRemoveAllChecked}
        isActiveFooterBtnDelAll={isActiveFooterBtnDelAll}
      />
      <Button className={'btn-login-logout'} label={'Logout'} onClick={Logout} />
    </>
  )
}

export default React.memo(Home);
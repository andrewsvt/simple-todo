import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './Todo/TodoList';
import Context from './context';
import TodoInput from './Todo/TodoInput';

function App() {
  let [todoObjArray, setTodoObjArray] = useState([
    // { id: 0, completed: false, title: 'First ToDo' },
  ]);
  let [countOfCompleted, setCountOfCompleted] = useState(0);

  //get data from LS
  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todoList'));
    if (todoList) {
      setTodoObjArray(todoList);
    }

    const count = JSON.parse(localStorage.getItem('countOfCompleted'));
    if (count) {
      setCountOfCompleted(count);
    }
  }, []);

  //set data to LS
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoObjArray));
    localStorage.setItem('countOfCompleted', JSON.stringify(countOfCompleted));
  }, [todoObjArray, countOfCompleted]);

  function taskCompleted(anyId) {
    setTodoObjArray(
      todoObjArray.map((e) => {
        if (e.id === anyId) {
          e.completed = !e.completed; // true to false and vice versa
          if (e.completed) {
            setCountOfCompleted((countOfCompleted += 1));
          } else setCountOfCompleted((countOfCompleted -= 1));
        }
        return e;
      }),
    );
  }

  function clearAll() {
    setTodoObjArray([]);
    setCountOfCompleted(0);
    localStorage.clear();
  }

  function removeTodo(id) {
    setTodoObjArray(todoObjArray.filter((e) => e.id !== id));

    todoObjArray.map((e) => {
      if (e.id === id && e.completed) {
        setCountOfCompleted((countOfCompleted -= 1));
      }
      return 0;
    });
  }

  function addTodo(title) {
    setTodoObjArray(
      todoObjArray.concat([
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ]),
    );
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <div className="title">
          <h1>TASK LIST</h1>
          <div>
            {countOfCompleted <= 0 && todoObjArray.length
              ? '0% is done'
              : !todoObjArray.length
              ? ''
              : Math.round((countOfCompleted * 100) / todoObjArray.length) + '% is done'}
          </div>
        </div>
        <TodoInput onCreate={addTodo} clearAll={clearAll} />

        {todoObjArray.length ? (
          <TodoList todoObjArray={todoObjArray} onToggle={taskCompleted} />
        ) : (
          <p>No tasks yet 🤔</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;

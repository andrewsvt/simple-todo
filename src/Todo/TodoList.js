import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import TodoItem from './TodoItem';

function TodoList(props) {
  return (
    <ul>
      {props.todoObjArray.map((e, index) => {
        return (
          <TodoItem
            arrayElement={e} // current array element in map cycle
            key={e.id} // to avoid console warnings
            index={index} // list order
            onChange={props.onToggle}
          />
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoObjArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoList;

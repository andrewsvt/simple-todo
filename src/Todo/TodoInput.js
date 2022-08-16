import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TodoInput.css';

function TodoInput(props) {
  const [inputValue, setInputValue] = useState('');

  function submitHandler(event) {
    // eslint-disable-next-line no-unused-expressions
    event.preventDefault(); // page will not be reloaded

    if (inputValue.trim()) {
      props.onCreate(inputValue);
      setInputValue('');
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <input
          placeholder="Type smth..."
          className="inputForm"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <div className="buttonWrapper">
          <button className="addButton" type="submit">
            <span>Add</span>
          </button>
          <button className="removeButton" onClick={() => props.clearAll()}>
            <span>Clear All</span>
          </button>
        </div>
      </form>
    </div>
  );
}

TodoInput.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default TodoInput;

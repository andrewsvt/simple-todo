import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import './TodoItem.css'
import Context from '../context'

// function TodoItem({ arrayElement, index, onChange }) instead of props

function TodoItem(props) {
  const { removeTodo } = useContext(Context)
  const titleClasses = []

  if (props.arrayElement.completed) {
    titleClasses.push('completed')
  }

  return (
    <li>
      <div className="left-box-title">
        <div className="left-box-id">
          <input
            className="chackbox"
            checked={props.arrayElement.completed}
            type="checkbox"
            onChange={() => props.onChange(props.arrayElement.id)}
          />
          <span className="index">{props.index + 1}</span>
        </div>
        <span className={'taskTitle ' + titleClasses.join(' ')}>
          {props.arrayElement.title}
        </span>
      </div>
      <button
        className="button"
        onClick={() => removeTodo(props.arrayElement.id)}
      >
        <strong>✖</strong>
      </button>
    </li>
  )
}

TodoItem.propTypes = {
  arrayElement: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func
}

export default TodoItem

import * as React from 'react'

import {AiTwotoneDelete, AiTwotoneEdit} from 'react-icons/ai'

import './index.css'

const TodoItem = ({task, timesUpdated, onUpdate, onDelete}) => (
  <div className="todo-item">
    <div className="todo-item-content">
      <div className="todo-item-title">
        {task} (Updated {timesUpdated} times)
      </div>

      <div className="todo-item-actions">
        <button
          type="button"
          onClick={onUpdate}
          className="todo-item-update-btn"
          aria-label={`Update ${task}`}
        >
          <AiTwotoneEdit className="todo-item-icon t-icon" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="todo-item-delete-btn"
          aria-label={`Delete ${task}`}
        >
          <AiTwotoneDelete className="todo-item-icon t-icon" />
        </button>
      </div>
    </div>
  </div>
)

function Todo() {
  const [todos, setTodos] = React.useState([
    {id: 1, task: 'Read blog', timesUpdated: 0},
    {id: 2, task: 'Write code', timesUpdated: 2},
  ])

  const [newTask, setNewTask] = React.useState('')
  const [editTask, setEditTask] = React.useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    if (editTask) {
      const updatedTodos = todos.map(todo =>
        todo.id === editTask.id
          ? {
              ...todo,
              task: newTask,
              timesUpdated:
                todo.task !== newTask
                  ? todo.timesUpdated + 1
                  : todo.timesUpdated,
            }
          : todo,
      )
      setTodos(updatedTodos)
      setEditTask(null)
    } else {
      const newTodo = {
        id: Date.now(),
        task: newTask,
        timesUpdated: 0,
      }
      setTodos([...todos, newTodo])
    }
    setNewTask('')
  }

  const handleUpdate = todo => {
    setNewTask(todo.task)
    setEditTask(todo)
  }

  const handleDelete = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  return (
    <>
      <div className="container">
        <main className="todo-list">
          <header className="todo-list-header">Todo List</header>
          <form onSubmit={handleSubmit} className="todo-form">
            <label htmlFor="newTask" className="visually-hidden">
              {editTask ? `Update "${editTask.task}"` : 'Add a new task'}
            </label>
            <input
              type="text"
              id="newTask"
              placeholder={editTask ? 'Update task' : 'Add a new task'}
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              className="todo-input"
              aria-label={
                editTask ? `Update "${editTask.task}"` : 'Add a new task'
              }
            />
            <button type="submit" className="todo-add-btn">
              {editTask ? 'Save' : 'Add'}
            </button>
          </form>
          <section className="todo-items">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                id={todo.id}
                task={todo.task}
                timesUpdated={todo.timesUpdated}
                onUpdate={() => handleUpdate(todo)}
                onDelete={() => handleDelete(todo.id)}
              />
            ))}
          </section>
        </main>
      </div>
    </>
  )
}

export default Todo

import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import Todo from './Todo';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const TodoList = ({ todo, toggleComplete }) => {
  console.log('1', todo);

  // Check if todo and todo.todos are defined before mapping over todo.todos
  if (!todo || !todo.todos) {
    return null; // or you can return a loading indicator or an empty message
  }

  return (
    <div>
      {todo.todos.map((todoItem, index) => (
        <Todo
          toggleComplete={toggleComplete}
          key={index}
          todo={todoItem}
        />
      ))}
    </div>
  );
};

export default TodoList;
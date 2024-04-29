import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo,toggleComplete,index,deleteTodo }) => {
    console.log('todo',todo)
  return (
   
    <li className={todo.status ? style.liComplete : style.li}>
      <div className={style.row}>
        <input onChange={()=>toggleComplete(index)} type='checkbox' checked={todo.status ? 'checked' : ''} />
        <p onClick={()=>toggleComplete(index)} className={todo.status ? style.textComplete : style.text}>
          {todo.description}
        </p>
      </div>
      <button onClick={()=>deleteTodo(index)}>{<FaRegTrashAlt />}</button>
    </li>
  );
};

export default Todo;
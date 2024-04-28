import React,{useEffect, useState} from 'react';
import styles from "./index.css"
import { AiOutlinePlus } from 'react-icons/ai';
import { query, collection, onSnapshot, QuerySnapshot,updateDoc,doc } from 'firebase/firestore';
import {db} from './firebase';
import { useNavigate } from 'react-router-dom';

export default function ProjectPage() {
  const navigate = useNavigate();
  const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
    container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `text-center p-2`,
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    row: `flex`,
  };
  const [project,setProject]=useState('');
  const [projectList,setProjectList]=useState([]);


  
  useEffect(() => {
    const q = query(collection(db, 'projects'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todosArr = [];
        querySnapshot.forEach((doc) => {
            todosArr.push({ ...doc.data(), id: doc.id });
        });
        setProjectList(todosArr);
        console.log('Projects fetched:', todosArr);
    }, (error) => {
        console.error('Error fetching projects:', error);
    });

    return () => unsubscribe();
}, []);


const showTodo=(id)=>{
  navigate(`/todo/${id}`);
}
  return (
    <div className={style.bg}>
    <div className={style.container}>
      <h3 className={style.heading}>Project</h3>
      {project}
      <form  className={style.form}>
        <input
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className={style.input}
          type='text'
          placeholder='Add Project'
        />
         <button className={style.button}>
          <AiOutlinePlus size={30} />
        </button>
        </form>
        {
          projectList.map((project)=>(
            <li className={style.li} key={project.id} onClick={() => showTodo(project.id)}>
            <div className={style.row} >
              {project.title}
              </div>
              </li>
          
          ))
        }
        </div>
        </div>
  )
}

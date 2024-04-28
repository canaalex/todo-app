
import styles from "./index.css"
import React,{useEffect, useState} from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import Todo from './components/Todo';
import { query, collection, onSnapshot, QuerySnapshot,updateDoc,doc,getDoc } from 'firebase/firestore';
import {db} from './firebase';
import { useParams } from 'react-router-dom';

function App() {
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
  const [project, setProject] = useState([]);
  const { id } = useParams();
  console.log('id',id);

  const toggleComplete = async (project, todoIndex) => {
    if (todoIndex >= 0 && todoIndex < project.todos.length) {
      // Toggle the completed status of the todo item
      const updatedTodos = [...project.todos];
      updatedTodos[todoIndex].completed = !updatedTodos[todoIndex].completed;
      
      // Update the project document in Firestore with the updated todos array
      await updateDoc(doc(db, 'projects', project.id), {
        todos: updatedTodos
      });
    } else {
      console.error(`Invalid todo index: ${todoIndex}`);
    }
  };

//   useEffect(() => {
//     const q = query(collection(db, 'projects'));

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//         let todosArr = [];
//         querySnapshot.forEach((doc) => {
//             todosArr.push({ ...doc.data(), id: doc.id });
//         });
//         setTodos(todosArr);
//         console.log('Todos fetched:', todosArr);
//     }, (error) => {
//         console.error('Error fetching todos:', error);
//     });

//     return () => unsubscribe();
// }, []);
useEffect(() => {
  const fetchProject = async () => {
    try {
      const projectDocRef = doc(db, 'projects', id);
      const projectDocSnapshot = await getDoc(projectDocRef);
      if (projectDocSnapshot.exists()) {
        setProject({ ...projectDocSnapshot.data(), id: projectDocSnapshot.id });
        console.log('Project fetched:', projectDocSnapshot.data());
      } else {
        console.log('No project found with ID:', id);
      }
    } catch (error) {
      console.error('Error fetching project:', error);
    }
  };

  fetchProject();
}, [id]);

// if(!todos){
//   const todosList = todos[1].todos;
//   console.log('checkkk',todosList);
// }


  return (
    <div className={style.bg}>
    <div className={style.container}>
      <h3 className={style.heading}>Todo App</h3>
  
      <form  className={style.form}>
        <input
          // value={input}
          // onChange={(e) => setInput(e.target.value)}
          className={style.input}
          type='text'
          placeholder='Add Todo'
        />
        <button className={style.button}>
          <AiOutlinePlus size={30} />
        </button>
      </form>
  
      <div>
    {project && project.todos ? (
      project.todos.map((todo, index) => (
        <Todo
          key={index}
          todo={todo}
          toggleComplete={toggleComplete}
        />
      ))
    ) : (
      <li className={style.li} >
      <div className={style.row} >
      <p>No todos found for this project</p>
        </div>
        </li>
    )}
  </div>
      </div>
      </div>
  );
}

export default App;

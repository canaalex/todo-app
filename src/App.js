
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
  const [input,setInput]=useState('');
  const { id } = useParams();


  const createTodo = async (e) => {
    e.preventDefault();
  
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }
     console.log('inside',id)
    try {
      // Add a new todo to the 'todos' array in the specified project document
      const projectRef = doc(db, 'projects', id);
      const projectSnapshot = await getDoc(projectRef);
      const createdAt = new Date();
      
      if (projectSnapshot.exists()) {
        const projectData = projectSnapshot.data();
        if(!projectData.todos){
          const updatedTodos = [{ description: input, status: false,createdDate:createdAt,updatedDate:createdAt}];
            
        await updateDoc(projectRef, { todos: updatedTodos });
        setProject({ ...projectData, todos: updatedTodos });
        }
        else {  const updatedTodos = [...projectData.todos, { description: input, status: false,createdDate:createdAt,updatedDate:createdAt}];
        
        await updateDoc(projectRef, { todos: updatedTodos });
        setProject({ ...projectData, todos: updatedTodos });}
      
      
      } else {
        console.error('Project does not exist');
      }
  
      // Clear the input field after creating the todo
      setInput('');
    } catch (error) {
      console.error('Error creating todo:', error);
      // Handle error (e.g., show error message to the user)
    }
  };
  

  const toggleComplete = async (todoIndex) => {
    if (!project || typeof project !== 'object' || !Array.isArray(project.todos)) {
      console.error('Project state is empty, not an object, or todos is not an array.');
      return;
    }
  
    if (todoIndex < 0 || todoIndex >= project.todos.length) {
      console.error(`Invalid todo index: ${todoIndex}`);
      return;
    }
  
    // Toggle the completion status of the todo item
    const updatedTodos = [...project.todos]; // Make a shallow copy of todos array
    updatedTodos[todoIndex] = {
      ...updatedTodos[todoIndex],
      status: !updatedTodos[todoIndex].status
    };
  
    try {
      // Update the project document in Firestore with the updated todos array
      await updateDoc(doc(db, 'projects', project.id), {
        todos: updatedTodos
      });
  
      // Update the project state with the updated todos array
      setProject({ ...project, todos: updatedTodos });
      console.log('update');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  const deleteTodo = async (todoIndex) => {
    try {
      if (!Array.isArray(project.todos)) {
        console.error('Todos array is not defined or not an array.');
        return;
      }
  
      if (todoIndex < 0 || todoIndex >= project.todos.length) {
        console.error(`Invalid todo index: ${todoIndex}`);
        return;
      }
  
      // Make a shallow copy of the todos array and remove the todo at the specified index
      const updatedTodos = [...project.todos.slice(0, todoIndex), ...project.todos.slice(todoIndex + 1)];

      // Update the project document in Firestore with the modified todos array
      await updateDoc(doc(db, 'projects', id), {
        todos: updatedTodos
      });
     console.log('delete',updatedTodos);
      // Update the local state with the modified todos array
      setProject({ ...project, todos: updatedTodos });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

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


  return (
    <div className={style.bg}>
    <div className={style.container}>
      <h3 className={style.heading}>Todo App</h3>
  
      <form onSubmit={createTodo} className={style.form}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
          index={index}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
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
      {project.todos && project.todos.length ?(<p className={style.count}>{`You have ${project.todos.length} todos`}</p>):''}
      </div>
      </div>
  );
}

export default App;

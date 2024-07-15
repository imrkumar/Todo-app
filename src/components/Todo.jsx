import { useEffect, useState } from "react";
import { FaRegCircle,FaRegCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

 const Todo = () => {
    //states
    const [todos,setTodos] = useState([]);
    const [data,setData] =useState("");
    //handler
    const handleToggle = (index) =>{
       const newTodos = [...todos];
       newTodos[index].completed = !newTodos[index].completed;
       setTodos(newTodos)
    }
    const handleAddTodo = (e) => {
        setData(e.target.value);  
    }
    const addTodo = () => {
       if(data.trim !==""){
        setTodos([...todos,{text:data,completed:false}])
        setData("");
       }
    }
    const deleteTodo = (index) => {
        const newTodos = todos.filter((todo,i)=>(i!==index));
        setTodos(newTodos); 
    }
    const handleKeyPress = (event) =>{
      if(event.key==="Enter"){
        addTodo();
      }
    }
    useEffect(()=>{
      const getTodos = JSON.parse(localStorage.getItem('todos'));
      if(getTodos){
        setTodos(getTodos);
      }
    },[]);
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos));
    },[todos]);
  return (
    <div className="bg-purple-50 w-[30%] h-[70%] border rounded-md p-4">
        <div className="flex justify-center w-[100%] mt-2">
            <input type="text" className="py-2 px-4 border-zinc-300 outline-none w-[90%]" placeholder="create your task here" onChange={handleAddTodo} value={data} onKeyPress={handleKeyPress} />
            <button className="bg-purple-700 py-2 px-4 text-white" onClick={addTodo}>Add</button>
        </div>
        <div className="mt-4">
            <ul className="w-[80%] mx-auto">
               {todos.map((item,index)=>(
                <li className="text-black text-2xl flex items-center justify-between mb-2" key={index}>
                    <span className="flex items-center">
                    <span>{item.completed?<FaRegCheckCircle className="me-3 cursor-pointer text-green-600" onClick={()=>{handleToggle(index)}}/>:<FaRegCircle className="me-3 cursor-pointer" onClick={()=>{handleToggle(index)}}/>}</span>
                     <span className={`${item.completed?"line-through":""} cursor-pointer text-wrap`} onClick={()=>{handleToggle(index)}}>{item.text}</span>
                    </span> <span onClick={()=>{deleteTodo(index)}}><MdDelete className="text-red-500 cursor-pointer"/></span>
                </li>
               ))}
            </ul>
        </div>
    </div>
  )
}

export default Todo;

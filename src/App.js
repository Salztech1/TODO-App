import React, { useEffect, useState } from 'react'
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'

function App() {

  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      decription: newDescription
    }

    let updatedTodos = [...allTodos]
    updatedTodos.push(newTodoItem)
    setAllTodos(updatedTodos)
    localStorage.setItem('todolist', JSON.stringify(updatedTodos)) // To store in the localstorage you use JSON.stringify
  }

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index)

    localStorage.setItem('todolist', JSON.stringify(reducedTodo)); // To store in the localstorage you use JSON.stringify
    setAllTodos(reducedTodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyy + 'at' + h + ':' + m + ':' + s


    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn

    }

    let updatedCompletedArr = [...completedTodos]
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodo', JSON.stringify(updatedCompletedArr))

  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index)

    localStorage.setItem('completedTodo', JSON.stringify(reducedTodo)); // To store in the localstorage you use JSON.stringify
    setCompletedTodos(reducedTodo);
  }


  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist')); //use JSON.parse to convert an object back to an arrey
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));

    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if(savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo)
    }

  }, [])

  return (
    <div className="App">
      <h2 className='heading' >My Todo App</h2>
      <div className='border'>
        <div className='todo-content'>
          <div>
            <label><b>Title:</b></label> <br />
            <input className='todo-input' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type='text' placeholder=" Your To Do title? " />
          </div>


          <div className='todo-description'>
            <label><b>Description:</b></label> <br />
            <input className='todo-input' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} type='text' placeholder=" Your To Do description? " />
          </div>
          <div>

          </div>
          <div>
            <button className='add-button' onClick={handleAddTodo}>Add</button>
          </div>

        </div>
        <div className='todo-butt'>
          <button className={`isCompleted ${isCompleted === false && 'active'}`} onClick={() => setIsCompleted(false)}>To Do</button>
          <button className={`isCompleted ${isCompleted === true && 'active'}`} onClick={() => setIsCompleted(true)}>Completed</button>
        </div>

        <div className='todo-list'>
          {isCompleted === false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.decription}</p>
                </div>

                <div >
                  <AiOutlineDelete className='delete-icon' onClick={() => handleDeleteTodo(index)} />
                  <BsCheckLg className='check-icon' onClick={() => handleComplete(index)} />
                </div>
              </div>
            )
          })}

          {isCompleted === true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.decription}</p>
                  <p><small>Completed On:{item.completedOn}</small></p>
                </div>

                <div >
                  <AiOutlineDelete className='delete-icon' onClick={() => handleDeleteCompletedTodo(index)} />
                </div>
              </div>
            )
          })}

        </div>

      </div>
    </div>

  );
}

export default App;

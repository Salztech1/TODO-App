import React, { useState } from 'react'
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs'

function App() {

  const [isCompleted, setIsCompleted] = useState(false)

  return (
    <div className="App">
      <h2 className='heading' >My Todo App</h2>
      <div className='border'>
        <div className='todo-content'>
          <div>
            <label><b>Title:</b></label> <br />
            <input className='todo-input' type='text' placeholder=" Your To Do title? " />
          </div>


          <div className='todo-description'>
            <label><b>Description:</b></label> <br />
            <input className='todo-input' type='text' placeholder=" Your To Do description? " />
          </div>
          <div>

          </div>
          <div>
            <button className='add-button'>Add</button>
          </div>

        </div>
        <div className='todo-butt'>
          <button className={`isCompleted ${isCompleted === false && 'active'}`} onClick={() => setIsCompleted(false)}>To Do</button>
          <button className={`isCompleted ${isCompleted === true && 'active'}`} onClick={() => setIsCompleted(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          <div className='todo-list-item'>
            <div>
            <h3>Task 1</h3>
            <p>Description</p>
            </div>
            
            <div >
            <AiOutlineDelete className='delete-icon' />
            <BsCheckLg className='check-icon' />
          </div>
          </div>
          
        </div>
        
      </div>
    </div>

  );
}

export default App;

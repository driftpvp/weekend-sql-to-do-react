import {useEffect, useState} from 'react';
import axios from 'axios';

import './App.css'

function App () {

  const [toDoList, setToDoList] = useState([]);
  // const [newToDoName, setNewToDoName] = useState('');
  // const [newToDoDue, setNewToDoDue] = useState('');

  const fetchChecklist = () => {
    axios.get('/todo')
    .then((response) => {
      console.log(response);
      console.log(response.data);
      setToDoList(response.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  useEffect( () => {
    fetchChecklist();
  }, []);

  return (
    <div className='App'>
      <h1>To Do Checklist</h1>
      <br></br>
      <br></br>
      <h3>All Tasks</h3>
      <ul>
        {toDoList.map(toDO =>
          (<li key={toDO.id}>{toDO.name} is due {toDO.due} military time.</li>)
          )}
      </ul>
    </div>

  );

}

export default App

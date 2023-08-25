import {useEffect, useState} from 'react';
import axios from 'axios';

//Material styling
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//import { Search, Call } from '@mui/icons-material';

import './App.css'

function App () {

  const [toDoList, setToDoList] = useState([]);
  const [newToDoName, setNewToDoName] = useState('');
  const [newToDoDue, setNewToDoDue] = useState('');
  // const [isDone, setIsDone] = useState(false)

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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/todo`, {name: newToDoName, due: newToDoDue})
    .then((response) => {
      console.log(response);
      fetchChecklist();
      setNewToDoName('');
      setNewToDoDue('');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const deleteTask = (id) => {
    axios.delete(`/todo/${id}`)
    .then((response) => {
      console.log(response);
      fetchChecklist();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const toggleTask = (id) => {
    axios.put(`/todo/toggle/${id}`)
    .then((response) => {
      console.log(response);
      fetchChecklist();
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
      <h2>Add Task</h2>
      <Box
      sx={{
        width: 750,
        height: 75,
        border: '1px dashed yellow',
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
      >
      
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input onChange={ (event) => setNewToDoName(event.target.value) }
          value={newToDoName}/>
        <label>Due:</label>
        <input onChange={ (event) => setNewToDoDue(event.target.value) }
          value={newToDoDue}/>
        <button type="submit">Add New Task</button>
      </form>
      </Box>
      <br></br>
      <br></br>
      <h2>All Tasks</h2>
      <ol>
        {toDoList.map(toDO =>
          (<li key={toDO.id} className = {toDO.done ? 'done': 'standard'}>{toDO.name} is due {toDO.due} military time.
          
          <button onClick={() => toggleTask(toDO.id)}>Completed: {JSON.stringify(toDO.done)}</button>
          <button onClick={() => deleteTask(toDO.id)}>Remove</button></li>)
          )}
      </ol>
    </div>

  );

}

export default App

import React from 'react';
import { useSelector } from 'react-redux';

export default function Allpost() {
  const todos = useSelector((state) => state.todos); // Assuming state.todos is an array of todos
  
  // Get the last todo from the array
  const lastTodo = todos[todos.length - 1];
  const raw = localStorage.getItem('rawData')
  const datt = JSON.parse(raw)
  

  return (
    <div>
      <h1>All post</h1>
      {lastTodo ? (
        <p>Last Todo: {lastTodo.title} {lastTodo.text.text1}</p>
      ) : (
        <p>No Value</p>
        
      )}
      {datt ? (
        <p>local: {datt.title} {datt.text.text1}</p>
      ) : (
        <p>No Value local</p>
        
      )}
    </div>
  );
}

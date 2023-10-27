import React from 'react'
import Post from './post'
import Allpost from './allpost'
import { useState } from 'react';

export default function Redux() {
  const [count, setCount] = useState(0);
  localStorage.setItem('count',count)
  const rawcount = localStorage.getItem('count')

  // Function to increment the count
  const increment = () => {
    setCount(count + 1);
  };

  // Function to decrement the count
  const decrement = () => {
    // Make sure the count doesn't go below 0
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div>
        <Post/>
        <Allpost/>
        <div>
        <h1>Number Counter</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
        </div>
        <div>
        {rawcount ? (
        <p>local: {rawcount}</p>
      ) : (
        <p>No Value local</p>
        
      )}
        </div>
    </div>
  )
}

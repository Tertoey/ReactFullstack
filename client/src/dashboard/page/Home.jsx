import React from 'react';
import '../style/dashboard.css';
import { useSelector } from 'react-redux';
import Navbar from '../component/nav_bar';
import Table from '../component/table'
import Linechart from '../component/lineChart'

function App() {
  // const todos = useSelector((state) => state.todos); // Assuming state.todos is an array of todos
  // // Get the last todo from the array
  // const lastTodo = todos[todos.length - 1];

  // useEffect(() => {
  //   authen();
  //   fetchData();
  //   const intervalId = setInterval(() => {
  //       fetchData(); // Fetch data every 10 seconds
  //     }, 10000); // 10000 milliseconds = 10 seconds
  //     // Clear the interval when the component unmounts
  //     return () => {
  //       clearInterval(intervalId);
  //     };
  // }, [])

  return (
    <div className='flex'>
      <Navbar/>
      {/* Content */}
      <main className="bg-gray-200 flex-1">
      <h1>Home</h1>
      <Linechart/>
      <Table/>
      </main>
    </div>
  );
}

export default App;
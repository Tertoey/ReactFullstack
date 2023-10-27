import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../reducers/todoSlice";

function Post() {
  const [todoText, setTodoText] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const dispatch = useDispatch();

  const addTodoHandle = (e) => {
    e.preventDefault();
    
    // Create an object to represent the todo item with text and additionalInfo
    const todoItem = {
      title: todoText,
      text: {
        text1: additionalInfo,
        title: todoText
      }
    };
    localStorage.setItem('rawData',JSON.stringify(todoItem))

    // Dispatch the addTodo action with the todo item object
    dispatch(addTodo(todoItem));

    // Clear the input fields after adding the todo
    setTodoText('');
    setAdditionalInfo('');
  };

  return (
    <div>
      <form onSubmit={addTodoHandle}>
        <input
          type="text"
          required
          placeholder="Todo Text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Additional Info"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Post;

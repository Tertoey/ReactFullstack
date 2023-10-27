import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        title: action.payload.title,
        text: action.payload.text
        
      };
      state.todos.push(todo); 
    //   or state.todos = [...state.todos, todo]; // Create a new array
    },
    // removeTodo: (state, action) => {
    //   state.todos = state.todos.filter((todo) =>
    //     todo.id !== action.payload
    //   );
    // },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;



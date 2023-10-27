import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userProfile = createAsyncThunk('fetchProfile',async ()=>{
    const user = localStorage.getItem('userData')
    const jsondata = {
        email:user
      }
    const response = await fetch('http://127.0.0.1:8080/profile',{
        method:'POST' ,
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(jsondata)
    })
    return response.json()
})


const todoSlice = createSlice({
    name: "todo",
    initialState: {
      isLoading: false,
      data: null,
      isError: false,
    },
    extraReducers: (builder) => {
      builder.addCase(userProfile.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(userProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
      builder.addCase(userProfile.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      });
    },
  });
  
  export default todoSlice.reducer;
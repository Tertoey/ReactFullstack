import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSensor = createAsyncThunk('fetchSensor',async ()=>{
    const response = await fetch('http://127.0.0.1:8080/warehouseall')
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
      builder.addCase(fetchSensor.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchSensor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
      builder.addCase(fetchSensor.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      });
    },
  });
  
  export default todoSlice.reducer;
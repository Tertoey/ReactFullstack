import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // You can choose the storage engine you prefer
import todoReducer from './todoSlice';
import todoApi from './todoApi';
import todoProfile from './todoProfile';

const persistConfig = {
  key: 'root', // The key for storing the data in storage
  storage,
  whitelist: ['todos', 'apiSensors','profile'], // List of reducers you want to persist
};


const rootReducer = combineReducers({
  todos: todoReducer,
  apiSensors: todoApi,
  profile: todoProfile,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './todoSlice';
// import todoApi from './todoApi';
// import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   todos: todoReducer,
//   apiSensors: todoApi
// });

// export const store = configureStore({
//   reducer: rootReducer
// });
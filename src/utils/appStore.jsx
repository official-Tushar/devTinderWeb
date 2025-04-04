import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';

const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});

export default appStore;
import { configureStore } from '@reduxjs/toolkit';
import newsControlReducer from './reducers';

const store = configureStore({
  reducer: newsControlReducer,
});

export default store;

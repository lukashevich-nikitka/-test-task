/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import getNews from './thunks';

const initialNewsListState = {
  availableNewsList: [],
  displayedNewsList: [],
};

const newsControlReducer = createReducer(initialNewsListState, {
  [getNews.fulfilled]: (state, action) => {
    state.availableNewsList = action.payload;
  },
});

export default newsControlReducer;

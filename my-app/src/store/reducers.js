/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */

import { createReducer } from '@reduxjs/toolkit';
import getNews from './thunks';
import newsActions from './actions';

const initialNewsListState = {
  availableNewsList: [],
  displayedNewsList: {
    controllerIndex: 0,
    newsList: {
      topElements: [{ title: null, description: null }],
      mainElements: [{ title: null, description: null }],
      bottomElements: [{ title: null, description: null }],
    },
  },
};

const newsControlReducer = createReducer(initialNewsListState, {
  [getNews.fulfilled]: (state, action) => {
    state.availableNewsList = action.payload;
  },
  [newsActions.newsController]: (state, action) => {
    const { availableScreenHeight, newsBlockHeight } = action.payload;
    const visibleElements = Math.floor(availableScreenHeight / newsBlockHeight);
    let invisibleElements;
    visibleElements % 2 === 0
      ? (invisibleElements = visibleElements)
      : (invisibleElements = visibleElements - 1);
    state.displayedNewsList.newsList.topElements = state.availableNewsList
      .slice(
        state.availableNewsList.length - invisibleElements / 2,
      );
    state.displayedNewsList.newsList.mainElements = state.availableNewsList.slice(
      0,
      visibleElements,
    );
    state.displayedNewsList.newsList.bottomElements = state.availableNewsList.slice(
      visibleElements,
      visibleElements + invisibleElements / 2,
    );
  },
});

export default newsControlReducer;

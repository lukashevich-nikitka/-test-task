/* eslint-disable no-self-assign */
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
    state.displayedNewsList.newsList.topElements = state.availableNewsList.slice(
      state.availableNewsList.length
          + state.displayedNewsList.controllerIndex
          - invisibleElements / 2,
      state.availableNewsList.length + state.displayedNewsList.controllerIndex,
    );
    state.displayedNewsList.newsList.mainElements = state.availableNewsList.slice(
      0 + state.displayedNewsList.controllerIndex,
      visibleElements + state.displayedNewsList.controllerIndex,
    );
    state.displayedNewsList.newsList.bottomElements = state.availableNewsList.slice(
      visibleElements + state.displayedNewsList.controllerIndex,
      visibleElements
          + state.displayedNewsList.controllerIndex
          + invisibleElements / 2,
    );
  },
  [newsActions.scrollTop]: (state, action) => {
    if (action.payload >= state.availableNewsList.length - 1) {
      const restartElements = state.availableNewsList.splice(
        0,
        action.payload
          - (state.availableNewsList.length
            - state.displayedNewsList.newsList.mainElements.length),
      );
      state.availableNewsList.push(...restartElements);
    } else {
      state.displayedNewsList.controllerIndex = action.payload;
    }
  },
  [newsActions.scrollBottom]: (state, action) => {
    if (action.payload < 0) {
      const restartElements = state.availableNewsList.splice(
        state.availableNewsList.length
          - state.displayedNewsList.newsList.mainElements.length,
        state.displayedNewsList.newsList.mainElements.length,
      );
      state.availableNewsList = [...restartElements, ...state.availableNewsList];
    } else {
      state.displayedNewsList.controllerIndex = action.payload;
    }
  },
});

export default newsControlReducer;

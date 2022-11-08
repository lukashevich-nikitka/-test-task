import { createAction } from '@reduxjs/toolkit';

const newsController = createAction('controller');
const scrollTop = createAction('scrollTop');
const scrollBottom = createAction('scrollBottom');

const newsActions = {
  newsController,
  scrollTop,
  scrollBottom,
};

export default newsActions;

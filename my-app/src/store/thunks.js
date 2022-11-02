/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getNews = createAsyncThunk('main/newsPackage', async () => {
  const response = await axios.get(
    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=b015747f27284fe28c7ddce114e898ff',
  );
  return response.data.articles;
});

export default getNews;

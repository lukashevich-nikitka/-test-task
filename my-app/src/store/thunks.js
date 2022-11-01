import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getNews = createAsyncThunk('main/newsPackage', async () => {
  const response = await axios.get('https://newsdata.io/api/1/news?apikey=pub_12974ecdfcfb81ae083a4a162215b8b7fb17c&language=en');
  return response.data;
});

export default getNews;

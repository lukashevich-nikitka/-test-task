import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './styles/App.css';
import getNews from './store/thunks';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  return (
    <div>news</div>
  );
}

export default App;

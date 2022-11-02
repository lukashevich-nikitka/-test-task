/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import './styles/App.css';
import getNews from './store/thunks';
import NewsBlock from './components/news_block';
import newsActions from './store/actions';

function App({ currentNewsList }) {
  const { newsController } = newsActions;
  const dispatch = useDispatch();
  const availableScreenHeight = window.innerHeight;
  useEffect(() => {
    console.log(availableScreenHeight);
    dispatch(getNews())
      .then(() => dispatch(newsController({ availableScreenHeight, newsBlockHeight: 500 })));
  }, [availableScreenHeight]);
  return (
    <div className="app-wrapper">
      {currentNewsList[1].map((el) => (
        <NewsBlock
          key={currentNewsList.id}
          title={el.title}
          description={el.description}
        />
      ))}
    </div>
  );
}

export default connect((state) => ({
  availableNewsList: state.availableNewsList,
  currentNewsList: state.displayedNewsList,
}))(App);

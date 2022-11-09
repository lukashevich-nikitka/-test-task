/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, connect } from 'react-redux';
import './styles/App.css';
import getNews from './store/thunks';
import NewsBlock from './components/news_block';
import newsActions from './store/actions';

function App({ currentNewsList, currentIndexController, availableNewsList }) {
  const { newsController, scrollTop, scrollBottom } = newsActions;
  const dispatch = useDispatch();
  const availableScreenHeight = window.innerHeight;
  const handleScroll = useCallback((event) => {
    event.deltaY > 0
      ? dispatch(scrollTop(currentIndexController + 1))
      : dispatch(scrollBottom(currentIndexController - 1));
    dispatch(newsController({ availableScreenHeight, newsBlockHeight: 300 }));
    console.log('here');
  }, [availableScreenHeight, currentIndexController]);
  useEffect(() => {
    if (!availableNewsList.length) {
      dispatch(getNews()).then(() => dispatch(
        newsController({ availableScreenHeight, newsBlockHeight: 300 }),
      ));
    } else {
      dispatch(newsController({ availableScreenHeight, newsBlockHeight: 300 }));
    }
  }, [
    availableScreenHeight,
    currentIndexController,
    handleScroll,
  ]);
  return (
    <div className="app-wrapper" onWheel={handleScroll}>
      <div className="invisible-blocks">
        {currentNewsList.topElements.map((el) => (
          <NewsBlock
            key={el.urlToImage}
            title={el.title}
            description={el.description}
            content={el.content}
            url={el.urlToImage}
          />
        ))}
      </div>
      <div className="main-blocks">
        {currentNewsList.mainElements.map((el) => (
          <NewsBlock
            key={el.urlToImage}
            title={el.title}
            description={el.description}
            content={el.content}
            url={el.urlToImage}
          />
        ))}
      </div>
      <div className="invisible-blocks">
        {currentNewsList.bottomElements.map((el) => (
          <NewsBlock
            key={el.urlToImage}
            title={el.title}
            description={el.description}
            content={el.content}
            url={el.urlToImage}
          />
        ))}
      </div>
    </div>
  );
}

export default connect((state) => ({
  availableNewsList: state.availableNewsList,
  currentNewsList: state.displayedNewsList.newsList,
  currentIndexController: state.displayedNewsList.controllerIndex,
}))(App);

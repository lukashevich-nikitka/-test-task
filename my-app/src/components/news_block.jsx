import React from 'react';
import { connect } from 'react-redux';
import '../styles/news_block.css';

function NewsBlock(props) {
  const {
    title, description, content, url,
  } = props;
  return (
    <div className="news-block-wrapper" style={{ backgroundImage: `url(${url})` }}>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="content">{content}</div>
    </div>
  );
}

export default connect((state) => ({
  availableNewsList: state.availableNewsList,
}))(NewsBlock);

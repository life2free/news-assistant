import React from "react";
import { Link } from "react-router-dom";

import "./MainNews.css";
function MainNews(props) {
  let news = props.news;
  return (
    <div className="MainNews">
      <div className="MainNews-img">
        <Link to={"/news/" + news._id}>
          <img src={news.imageUrl} alt=""></img>
        </Link>
      </div>

      <div className="MainNews-info">
        <p className="MainNews-info-title">
          <Link to={"/news/" + news._id}>{news.title}</Link>
        </p>

        <p className="MainNews-info-description">{news.description}</p>
      </div>
    </div>
  );
}

export default MainNews;

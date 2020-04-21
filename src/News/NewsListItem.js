import React from "react";
import { Link } from "react-router-dom";

import "./NewsListItem.css";
function NewsListItem(props) {
  let news = props.news;
  return (
    <div className="NewsListItem">
      <div className="NewsListItem-img">
        <Link to={"/news/" + news._id}>
          <img src={news.imageUrl}></img>
        </Link>
      </div>
      <div className="NewsListItem-title">
        <Link to={"/news/" + news._id}>{news.title}</Link>
      </div>
    </div>
  );
}

export default NewsListItem;

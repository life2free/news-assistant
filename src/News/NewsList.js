import React, { Component } from "react";
import NewsListItem from "./NewsListItem";
import "./NewsList.css";

class NewsList extends Component {
  constructor() {
    super();
  }
  render() {
    let { newsList } = { ...this.props };
    let list = "";
    if (newsList !== null && newsList.length > 0) {
      list = newsList.map((item, i) => {
        return <NewsListItem news={item} key={i} />;
      });
    }
    return <div className="NewsList">{list}</div>;
  }
}

export default NewsList;

import React, { Component } from "react";
import Services from "../Utils/Services";
import "./Main.css";
import MainNews from "../News/MainNews";
import NewsList from "../News/NewsList";

class Main extends Component {
  componentDidMount() {
    if (
      this.props.match !== undefined &&
      this.props.match.params.q !== undefined
    ) {
      let keywords = this.props.match.params.q;
      if (keywords) {
        Services.getNewsByQuery(keywords, (res) => res.clone().json()).then(
          (res) => {
            this.props.setNewsList(res);
          }
        );
      }
    } else {
      Services.getAllNews((res) => res.clone().json()).then((res) => {
        this.props.setNewsList(res);
      });
    }
  }
  render() {
    let list = this.props.newsList;
    if (list !== null && list.length > 0) {
      let mainNews = list[0];
      let newsList = list.slice(1, 6);

      if (mainNews.title !== undefined) {
        return (
          <div className="Main">
            <MainNews news={mainNews} />
            <NewsList newsList={newsList} />
          </div>
        );
      } else {
        return "";
      }
    } else {
      return "";
    }
  }
}

export default Main;

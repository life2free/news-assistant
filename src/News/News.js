import React, { Component } from "react";
import "../App.css";
import "./News.css";
import Client from "../Client";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsid: props.match.params.newsid,
      news: null,
    };
  }

  editHandle = (e) => {
    window.location.href = `/newss/edit/${this.state.newsid}`;
  };

  deleteHandle = (e) => {
    let isDelete = window.confirm("Do you want to delete?");
    if (isDelete) {
      const requestOptions = {
        method: "delete",
        headers: { "Content-Type": "application/json" },
      };
      Client.deleteNesById(requestOptions, this.state.newsid, (res) =>
        res.clone().json()
      ).then((res) => {
        if (res._id !== undefined && res._id === this.state.newsid) {
          alert("the news delete successfully!");
          window.location.href = "/";
        } else {
          alert("the news delete failure!");
        }
      });
    }
  };

  componentDidMount() {
    let newsid = this.state.newsid;
    if (newsid !== undefined) {
      Client.getNewsById(newsid)
        .then((res) => res.clone().json())
        .then((res) => {
          this.setState({ news: res });
        });
    }
  }

  render() {
    let news = this.state.news;
    if (news !== null) {
      let { title, author, date, imageUrl, content, url, description } = {
        ...news,
      };
      let source = news.source;

      return (
        <div className="news_container">
          <div className="news_info">
            <h2
              className="font_24 news_title"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h2>
            <div className="font_12 news_author_publishedDate">
              <p className="news_author">{author}</p>
              <p className="news_publishedDate">{date}</p>
            </div>
            <div className="font_12 news_source_url">
              Source:
              <a className="news_source" href={url} target="_blank">
                {source.name}
              </a>
            </div>
            <div className="news_image">
              <img src={imageUrl} alt=""></img>
            </div>
            <div className="font_16 news_content">
              <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
          </div>
          <div className="news_info_action">
            <button className="news_info_button" onClick={this.editHandle}>
              Edit
            </button>
            <button className="news_info_button" onClick={this.deleteHandle}>
              Delete
            </button>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default News;

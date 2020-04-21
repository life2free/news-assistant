import React, { Component } from "react";
import "./Operate.css";
import Client from "../Client";

Date.prototype.Format = (fmt) => {
  let date = new Date();
  var o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

class Operate extends Component {
  constructor(props) {
    super(props);
    // operation: "1" for add, "2" for update
    let operation = this.props.op;
    if (operation === undefined) {
      operation = "1";
    }
    let newsId = "";
    if (operation === "2" && this.props.match.params.newsid !== undefined) {
      newsId = this.props.match.params.newsid;
    }
    this.state = {
      operation: operation,
      newsId: newsId,
      sourceItemList: "",
      sourceId: "",
      sourceName: "",
      author: "",
      title: "",
      description: "",
      content: "",
      date: "",
      url: "",
      imageUrl: "",
    };
  }

  componentDidMount() {
    let sourceList = [];
    let sourceItemList = "";
    Client.getAllSource((res) => res.clone().json()).then((res) => {
      sourceList = res;
      sourceItemList = sourceList.map((item, i) => {
        return (
          <option key={`sourceoption-${i}`} value={item._id}>
            {item.name}
          </option>
        );
      });

      // for update
      if (this.state.operation === "2" && this.state.newsId !== "") {
        Client.getNewsById(this.state.newsId)
          .then((res) => res.clone().json())
          .then((res) => {
            this.setState({
              author: res.author,
              title: res.title,
              description: res.description,
              content: res.content,
              date: res.date,
              url: res.url,
              imageUrl: res.imageUrl,
              sourceId: res.source._id,
              sourceItemList: sourceItemList,
            });
          });
      } else {
        this.setState({ sourceItemList: sourceItemList });
      }
    });
  }

  changeHandle = (e) => {
    let targetId = e.target.id;
    let targetValue = e.target.value;
    switch (targetId) {
      case "author-input": {
        this.setState({ author: targetValue });
        break;
      }
      case "title-input": {
        this.setState({ title: targetValue });
        break;
      }
      case "description-input": {
        this.setState({ description: targetValue });
        break;
      }
      case "content-input": {
        this.setState({ content: targetValue });
        break;
      }
      case "url-input": {
        this.setState({ url: targetValue });
        break;
      }
      case "imageUrl-input": {
        this.setState({ imageUrl: targetValue });
        break;
      }
      case "source-option": {
        this.setState({ sourceId: targetValue });
        break;
      }
      default:
    }
  };

  validateHandle = () => {
    if (this.state.author.trim() === "") {
      alert("Please type the author!");
      return false;
    }
    if (this.state.title.trim() === "") {
      alert("Please type the title!");
      return false;
    }
    if (this.state.description.trim() === "") {
      alert("Please type the description!");
      return false;
    }
    if (this.state.content.trim() === "") {
      alert("Please type the content!");
      return false;
    }
    if (this.state.url.trim() === "") {
      alert("Please type the url!");
      return false;
    }
    if (this.state.imageUrl.trim() === "") {
      alert("Please type the imageUrl!");
      return false;
    }
    if (this.state.sourceId.trim() === "") {
      alert("Please select the source!");
      return false;
    }
    return true;
  };

  submitHandle = (e) => {
    e.preventDefault();
    let date = new Date().Format("yyyy-MM-dd");

    let isSubmit = window.confirm("Do you want to submit?");
    if (isSubmit === true) {
      if (this.validateHandle()) {
        let requestBody = {
          author: this.state.author.trim(),
          title: this.state.title.trim(),
          description: this.state.description.trim(),
          content: this.state.content.trim(),
          url: this.state.url.trim(),
          imageUrl: this.state.imageUrl.trim(),
          date: date,
          source: { _id: this.state.sourceId.trim() },
        };

        if (this.state.operation === "1") {
          // create a news
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          };
          Client.createNews(requestOptions, (res) => res.clone().json()).then(
            (res) => {
              if (res._id !== undefined && res._id !== null) {
                alert("the news create successfully!");
                window.location.href = `/news/${res._id}`;
              } else {
                alert("the news create failure!");
              }
            }
          );
        } else {
          // edit a news
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          };
          Client.editNewsById(requestOptions, this.state.newsId, (res) =>
            res.clone().json()
          ).then((res) => {
            if (res._id !== undefined && res._id === this.state.newsId) {
              alert("the news edit successfully!");
              window.location.href = `/news/${res._id}`;
            } else {
              alert("the news edit failure!");
            }
          });
        }
      }
    }
  };

  render() {
    return (
      <div className="create-page">
        <form onSubmit={this.submitHandle}>
          <div className="author-container news-property-container">
            <div className="input-lable">
              Author <span className="input-required">(*Required</span>)
            </div>
            <input
              type="text"
              id="author-input"
              className="news-property-input"
              required="required"
              placeholder="author"
              value={this.state.author}
              onChange={this.changeHandle}
            />
          </div>
          <div className="news-property-container">
            <div className="input-lable">
              Title <span className="input-required">(*Required</span>)
            </div>
            <input
              type="text"
              id="title-input"
              className="news-property-input"
              required="required"
              placeholder="title"
              value={this.state.title}
              onChange={this.changeHandle}
            />
          </div>
          <div className="news-property-container">
            <div className="input-lable">
              Description
              <span className="input-required">(*Required</span>)
            </div>
            <textarea
              type="text"
              id="description-input"
              className="news-property-input"
              required="required"
              rows="4"
              cols="100"
              placeholder="description"
              value={this.state.description}
              onChange={this.changeHandle}
            />
          </div>
          <div className="news-property-container">
            <div className="input-lable">
              Content <span className="input-required">(*Required</span>)
            </div>
            <textarea
              type="text"
              id="content-input"
              className="news-property-input"
              required="required"
              rows="5"
              cols="100"
              placeholder="content"
              value={this.state.content}
              onChange={this.changeHandle}
            />
          </div>
          <div className="news-property-container">
            <div className="input-lable">
              Url <span className="input-required">(*Required</span>)
            </div>
            <input
              type="text"
              id="url-input"
              className="news-property-input"
              required="required"
              placeholder="url"
              value={this.state.url}
              onChange={this.changeHandle}
            />
          </div>
          <div className="news-property-container">
            <div className="input-lable">
              ImageUrl <span className="input-required">(*Required</span>)
            </div>
            <input
              type="text"
              id="imageUrl-input"
              className="news-property-input"
              required="required"
              placeholder="imageUrl"
              value={this.state.imageUrl}
              onChange={this.changeHandle}
            />
          </div>
          <div className=" news-property-container">
            <div className="input-lable">
              Source <span className="input-required">(*Required</span>)
            </div>
            <div className="news-source-options">
              <select
                id="source-option"
                value={this.state.sourceId}
                onChange={this.changeHandle}
              >
                <option value=""></option>
                {this.state.sourceItemList}
              </select>
            </div>
          </div>
          <div className="create-submit">
            <input
              type="submit"
              value="Submit"
              className="create-submint-button"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Operate;

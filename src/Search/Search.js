import React, { Component } from "react";
import "./Search.css";
import Services from "../Utils/Services";
import NewsList from "../News/NewsList";
// import "date-fns";

const MaxResultRow = 4;
const ImgCountEachRow = 5;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      newsList: [],
      selectedDate: new Date(),
    };
  }

  changeHandle = (e) => {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
  };

  search = (e) => {
    e.preventDefault();
    let searchValue = this.state.searchValue;
    if (searchValue !== null) {
      searchValue = searchValue.trim();

      Services.getNewsByQuery(searchValue, (res) => res.clone().json()).then(
        (res) => {
          this.setState({ newsList: res });
        }
      );
    }
  };

  render() {
    let newsList = this.state.newsList;
    let searchResult = "";
    let list = [];
    if (newsList.length > 0) {
      let displayList = newsList.slice(0, MaxResultRow * ImgCountEachRow);
      for (let i = 0; i < MaxResultRow; i++) {
        let temp = displayList.slice(
          ImgCountEachRow * i,
          ImgCountEachRow * (i + 1)
        );

        list.push(temp);
      }

      searchResult = list.map((item, i) => {
        return <NewsList key={`list-${i}`} newsList={item} />;
      });
    }
    return (
      <div className="search-page">
        <div className="search-form-container">
          <form onSubmit={this.search} className="search-form">
            <input
              type="text"
              className="search-form-input"
              placeholder="search"
              value={this.state.searchValue}
              onChange={this.changeHandle}
            ></input>
          </form>
        </div>
        <div className="search-result">{searchResult}</div>
      </div>
    );
  }
}

export default Search;

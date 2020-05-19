import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import Main from "./Main/Main";
import News from "./News/News";
import Footer from "./Footer/Footer";
import SearchIcon from "@material-ui/icons/Search";
import Search from "./Search/Search";
import Operate from "./Operate/Operate";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      anchorEl: null,
    };
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleCreate = () => {
    window.location.href = "/newss/create";
    this.handleClose();
  };

  search = (e) => {
    alert("tes");
  };

  logState = () => {
    console.log(this.state);
  };
  setNewsList = (newsList) => {
    this.setState({ newsList: newsList }, () => {
      console.log(this.state);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="Nav-home">
            <Link to="/">Home</Link>
          </div>
          <div className="Nav-home">
            <Link to="/newss/category/financial">Financial</Link>
          </div>
          <div className="Nav-home">
            <Link to="/newss/category/covid">COVID</Link>
          </div>
          <div className="Nav-home">
            <Link to="/newss/category/sport">Sport</Link>
          </div>
          <div className="Nav-centerspace"></div>
          <div className="search-container">
            <a href="/newss/search">
              <SearchIcon />
            </a>
          </div>
          <div className="action-container">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Menu
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleCreate}>Create</MenuItem>
            </Menu>
          </div>
        </header>
        <main className="App-main">
          <Switch>
            <Route
              path="/"
              exact
              render={() => {
                // this.handleCategoryChange("");
                return (
                  <Main
                    key="main"
                    setNewsList={this.setNewsList}
                    {...this.state}
                  />
                );
              }}
            />
            <Route
              path="/newss/category/:q"
              render={(routerProps) => {
                let category = routerProps.match.params.q;
                return (
                  <Main
                    key={category}
                    setNewsList={this.setNewsList}
                    {...this.state}
                    {...routerProps}
                  />
                );
              }}
            />
            <Route
              path="/news/:newsid"
              render={(routerProps) => <News {...routerProps} />}
            />
            <Route path="/newss/search" render={() => <Search />} />
            <Route path="/newss/create" render={() => <Operate op="1" />} />
            <Route
              path="/newss/edit/:newsid"
              render={(routerProps) => <Operate op="2" {...routerProps} />}
            />
          </Switch>
        </main>
        <div className="App-footer">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

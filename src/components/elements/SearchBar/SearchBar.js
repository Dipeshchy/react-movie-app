import React, { Component } from "react";
import "./SearchBar.css";
import FontAwesome from "fontawesome";

class SearchBar extends Component {
  state = {
    value: ""
  };
  render() {
    return (
      <div className="rmdb-searchbar">
        <div className="rmdb-searchbar-content">
          <span name="search" size="2x" />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search"
            onChange={this.doSearch}
            value={this.state.value}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;

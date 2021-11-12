import React from "react";

const SearchBar = () => {
  return (
    <>
      <div className="input-group searchInput px-3 pt-3 mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text bg-white rounded-0 h-100" id="basic-addon1">
            <i className="fas fa-search"></i>
          </span>
        </div>
        <input
          type="text"
          className="form-control search rounded-0 border_left_0 shadow-none"
          placeholder="Search here..."
          aria-label="Search"
          aria-describedby="basic-addon1"
        />
      </div>
    </>
  );
};

export default SearchBar;

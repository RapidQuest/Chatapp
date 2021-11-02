import React from "react";

export default function index({ searchQuery, setSearchQuery }) {
  return (
    <>
    <div className="input-group searchInput px-3 pt-3 mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text bg-white rounded-0 h-100" id="basic-addon1">
          <i className="fas fa-search"></i>
        </span>
      </div>
      <input
        value={searchQuery}
        onInput={e => setSearchQuery(e.target.value)}
        type="text"
        className="form-control rounded-0 border_left_0 shadow-none"
        placeholder="Search here..."
        aria-label="Search"
        aria-describedby="basic-addon1"
      />
    </div>
    </>
  );
}

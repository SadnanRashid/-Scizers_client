import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // event.preventDefault();
    let fetchURI = "";
    if (query !== NaN) {
      fetchURI = `http://localhost:5000/api/contacts?name=${query}`;
    } else {
      fetchURI = `http://localhost:5000/api/contacts?phone=${query}`;
    }
    console.log(query);
    const response = await fetch(fetchURI);
    const results = await response.json();
    setSearchResults(results);
    console.log(searchResults);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSearchResults([]);
    if (event.target.value) {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="position-relative">
        <div className="mt-3 d-flex flex-row justify-content-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="form-control w-75"
            value={query}
            onChange={handleInputChange}
          />
          <button className="btn btn-dark ms-2">Search</button>
        </div>
        {/*  */}
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>

            {searchResults !== null && (
              <tbody>
                {searchResults.map((result) => (
                  <tr>
                    <td>1</td>
                    <td>{result.name}</td>
                    <td>{result.phone}</td>
                    <td>
                      <a href="#" className="btn btn-sm btn-primary">
                        Edit
                      </a>
                      <a href="#" className="btn btn-sm btn-danger">
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        {/*  */}
      </div>
    </div>
  );
}

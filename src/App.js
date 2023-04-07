import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import Search from "./components/search";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [modalData, setModalData] = useState({ name: "abc", phone: "123" });
  const [editPhn, setEditPhn] = useState("");
  const [render, setRender] = useState(1);

  useEffect(() => {
    const fetchAll = async () => {
      fetch("http://localhost:5000/api/contacts/all")
        .then((res) => res.json())
        .then((e) => setSearchResults(e));
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      const fetchURI = `http://localhost:5000/api/contacts?phone=${query}`;
      const response = await fetch(fetchURI);
      const results = await response.json();
      setSearchResults(results);
      console.log(results);
    };
    handleSearch();
  }, [render]);

  const handleSearch = async () => {
    // event.preventDefault();
    let fetchURI = "";
    if (isNaN(query)) {
      fetchURI = `http://localhost:5000/api/contacts?name=${query}`;
      console.log("name");
    } else {
      fetchURI = `http://localhost:5000/api/contacts?phone=${query}`;
      console.log("phone");
    }
    const response = await fetch(fetchURI);
    const results = await response.json();
    setSearchResults(results);
    console.log(results);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setSearchResults([]);
    if (event.target.value) {
      handleSearch();
    }
  };

  const handleEdit = async (id, phone, name) => {
    fetch(`http://localhost:5000/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        name: name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (render === 1) {
          setRender(2);
        } else {
          setRender(1);
        }
        setQuery(phone);
        console.log(data);
        toast.success("Contact Changed!");
      })
      .catch((error) => toast.error("Error occured"));
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

            {searchResults.length > 0 && (
              <tbody>
                {searchResults.map((result) => (
                  <tr>
                    <td>1</td>
                    <td>{result.name}</td>
                    <td>{result.phone}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {searchResults.length == 0 && (
            <h4 className="text-center">No results found</h4>
          )}
        </div>

        {/*  */}
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit a contact
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <p className="mb-0">Enter Name: </p>
              <input
                type="text"
                name="editText"
                id="editText"
                className="mb-3"
                placeholder={modalData.name}
                onChange={(e) => {
                  setEditPhn(e.target.value);
                  console.log(editPhn);
                }}
              />
              <p className="mb-0">Enter Phone: </p>
              <input
                type="text"
                name="editText"
                id="editText"
                className="mt-0"
                placeholder={modalData.phone}
                onChange={(e) => {
                  setEditPhn(e.target.value);
                  console.log(editPhn);
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Post(props) {
  const [load, setLoading] = useState(true);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const phone = event.target.phone.value;
    console.log(name, phone);

    if (!name || !phone) {
      toast.error("Must enter name and phone");
      return;
    }

    if (isNaN(phone)) {
      toast.error("Phone must be a number");
      return;
    }

    setLoading(false);

    try {
      const response = await fetch(
        `https://server-six-virid.vercel.app/api/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            name,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.acknowledged) {
        const randomNumber = Math.floor(Math.random() * 291) + 10;
        props.setLoad(randomNumber);
        toast.success(
          `Contact was successfully posted with id: ${data.insertedId}`
        );
        event.target.reset();
      } else {
        toast.error(`An error occurred. ${data.message}`);
      }
      setLoading(true);
    } catch (error) {
      setLoading(true);
      console.error(error);
      toast.error("An error occurred. Please check both fields and try again");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div>
        <Toaster />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group w-100">
          <label htmlFor="name" className="mb-2">
            Name:
          </label>
          <input
            type="text"
            className="form-control py-2"
            id="name"
            name="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group w-100">
          <label htmlFor="phone" className="mb-2">
            Phone:
          </label>
          <input
            type="text"
            className="form-control py-2"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="d-flex">
          {load ? (
            <button type="submit" className="btn btn-primary mt-3 w-75">
              Add Contact
            </button>
          ) : (
            <button disabled className="btn btn-dark mt-3 w-75">
              Add Contact
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

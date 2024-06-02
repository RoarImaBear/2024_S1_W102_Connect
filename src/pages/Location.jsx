import React from "react";
import { useNavigate } from "react-router-dom";

function LocationForm({ navigate }) {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    fetch('/some-api', { method: form.method, body: formData })
      .then(response => {
        // Handle successful response if needed
        console.log('Form submission successful', response);
      })
      .catch(error => {
        // Handle errors if needed
        console.error('Form submission error', error);
      });

    console.log(Object.fromEntries(formData.entries()));
    navigate("/profile");
  }

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label>Select a location: </label>
        <select name="location" id="location">
          <option value="Berlin">Berlin</option>
          <option value="London">London</option>
        </select>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default function SelectLocation() {
  const navigate = useNavigate();
  return (
    <LocationForm navigate={navigate} />
  );
}
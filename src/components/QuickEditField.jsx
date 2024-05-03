import React, { useState } from "react";
import { setDoc, updateDoc } from "@firebase/firestore";

// Functional component that toggles between an editable input field that writes to the database
// and a static div displaying the data fetched from that same spot in the database.

export function QuickEditField({ data, fieldName, docRef }) {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(data);

  // Updates the database for specified field
  const handleUpdateSubmit = async () => {
    let newValue = inputValue;

    try {
      await updateDoc(docRef, { [fieldName]: newValue });
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(docRef, { [fieldName]: newValue });
      }
    }
    setEditable(!editable);
  };

  // Handles input field change.
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Conditionally define field, depending if editable or not
  let field;
  if (editable) {
    field = (
      <div id="quick-edit" onClick={() => setEditable(!editable)}>
        <input
          id="field"
          value={inputValue}
          onChange={handleChange}
          onClick={(event) => event.stopPropagation()} // to prevent click on input field from counting as click on thing
        />
        <button onClick={handleUpdateSubmit}>Submit</button>
      </div>
    );
  } else {
    field = (
      <div id="quick-edit" onClick={() => setEditable(!editable)}>
        {data ? data : "..."}
      </div>
    );
  }
  return field;
}

import React, { useState } from "react";
import { setDoc, updateDoc } from "@firebase/firestore";

export function QuickEditField({ data, fieldName, docRef }) {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(data);

  const handleUpdateSubmit = async () => {
    let newValue = inputValue;

    try {
      await updateDoc(docRef, { [fieldName]: newValue });
    } catch (error) {
      if (error.code === "not-found") {
       await setDoc(docRef, { [fieldName]: newValue }); //error here
      }
    }
    setEditable(!editable);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  let field;
  if (editable) {
    field = (
      <div id="quick-edit" onClick={() => setEditable(!editable)}>
        <input
          id="field"
          value={inputValue}
          onChange={handleChange}
          onClick={(event) => event.stopPropagation()} // to prevent click on input field from counting as click on thing, error here
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

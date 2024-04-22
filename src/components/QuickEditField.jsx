import React, { useState } from "react";
import { setDoc, updateDoc } from "@firebase/firestore";

export function QuickEditField({ data, fieldName, docRef }) {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(data);

  const handleUpdateSubmit = async () => {
    setEditable(!editable);
    let newValue = document.getElementById("field").value;

    try {
      await updateDoc(docRef, { [fieldName]: newValue });
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(docRef, { [fieldName]: newValue });
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let field;
  if (editable) {
    field = (
      <div id="quick-edit" onClick={() => setEditable(!editable)}>
        <input
          id="field"
          value={value}
          onChange={handleChange}
          onClick={(event) => event.stopPropagation()} // to prevent click on input field from counting as click on thing
        />
        <button onClick={handleUpdateSubmit}>Submit</button>
      </div>
    );
  } else {
    field = (
      <div id="quick-edit" onClick={() => setEditable(!editable)}>
        {data && data.hasOwnProperty(fieldName) ? data[fieldName] : "..."}
      </div>
    );
  }
  return field;
}

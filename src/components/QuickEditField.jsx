import React, { useState } from "react";
import { setDoc, updateDoc } from "@firebase/firestore";

export function QuickEditField({ data, fieldName, docRef }) {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState(data);
  const isNumber = typeof data === "number" && Number.isFinite(data);

  const handleUpdateSubmit = async () => {
    setEditable(!editable);
    let newValue = document.getElementById("field").value;

    if (isNumber) newValue = parseFloat(newValue);
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
      <div onClick={() => setEditable(!editable)}>
        <input
          id="field"
          value={value}
          onChange={handleChange}
          onClick={(event) => event.stopPropagation()}
        />
        <button onClick={handleUpdateSubmit}>Submit</button>
      </div>
    );
  } else {
    field = (
      <div onClick={() => setEditable(!editable)}>
        {data?.name ? data?.name : "..."}
      </div>
    );
  }
  return field;
}

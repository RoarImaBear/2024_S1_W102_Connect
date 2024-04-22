import React, { useState } from "react";
import { setDoc, updateDoc } from "@firebase/firestore";

export function QuickSwapImage({ data, fieldName, docRef }) {
  console.log("data", data);
  console.log("docref", docRef);
  const [editable, setEditable] = useState(false);
  console.log("link", data);

  const [inputFieldValue, setInputValue] = useState(data?.link);

  const handleSubmit = async () => {
    setEditable(!editable);
    let newValue = document.getElementById("input-field").value;

    try {
      await updateDoc(docRef, { [fieldName]: newValue });
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(docRef, { [fieldName]: newValue });
      }
    }
  };

  fieldName = "link";

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  let field;
  if (editable) {
    field = (
      <div onClick={() => setEditable(!editable)}>
        <input
          id="input-field"
          value={inputFieldValue}
          onChange={handleChange}
          onClick={(event) => event.stopPropagation()}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  } else {
    field = (
      <img
        id="profile-picture"
        src={data?.link}
        alt="user's face... probably"
        onClick={() => setEditable(!editable)}
      />
    );
  }

  return field;
}

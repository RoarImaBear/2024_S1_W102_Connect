import React, { useState } from "react";
import { setDoc, updateDoc } from "@firebase/firestore";

// Functional component that toggles between an editable input field that writes image URL
// to the databaseand and a static img component that renders the URL in database.
// If profile hasn't been created, component will do so.

export function QuickSwapImage({ data, fieldName, docRef }) {
  const [editable, setEditable] = useState(false);
  const [imageURL, setImageURL] = useState(data);

  const handleSubmit = async () => {
    let newValue = imageURL;

    try {
      await updateDoc(docRef, { [fieldName]: newValue });
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(docRef, { [fieldName]: newValue });
      }
    }
    setEditable(!editable);
  };

  const handleChange = (event) => {
    setImageURL(event.target.value);
  };

  let field;
  if (editable) {
    field = (
      <div onClick={() => setEditable(!editable)}>
        <input
          id="input-field"
          value={imageURL}
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
        src={data}
        alt="user's face... probably"
        onClick={() => setEditable(!editable)}
      />
    );
  }

  return field;
}

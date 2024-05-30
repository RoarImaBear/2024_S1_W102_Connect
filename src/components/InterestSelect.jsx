import React, { useState } from "react";
import { firestore } from "../firebase";
import { doc, updateDoc, setDoc } from "@firebase/firestore";
import { useFetchRealtimeDoc } from "../support-functions/importFunctions";

const userID = "test-user";
const location = "berlin";

function InterestCheckbox({ interest }) {
  // console.log(interest);
  const [userInterestArray, setUserInterestArray] = useState([]);

  async function onClick() {
    //event.preventDefault();
    //write to database here

    const interestsRef = doc(
      firestore,
      `accounts/${location}/users/${userID}/user-interests/test`
    );
    console.log("on Submit", userID);

    try {
      await updateDoc(interestsRef, { [interest]: true });
      console.log("checkpoint 1");
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(interestsRef, { [interest]: true }); //error here
        console.log("checkpoint 2");
      }
    }
  }

  return (
    <div id="interest-checkbox">
      <button onClick={onClick}>{interest}</button>
    </div>
  );
}

export function InterestSelect(userID, location) 
{
  const userID = "test-user";
  const location = "berlin";

  const [interestsKeyArray, setInterestsArray] = useState([]);
  const interestsKeyRef = doc(firestore, `keys/interests-key`);

  const docRef = doc(firestore, `accounts/${location}/users/${userID}`);

  const [profileDoc, setDoc] = useState({});

  useFetchRealtimeDoc(interestsKeyRef, setInterestsArray);

  let interests = [];

  return (
    <div id="interest-options">
      <p>Select Interests</p>
      {interestsKeyArray?.interests?.map((interest, index) => (
        <InterestCheckbox key={index} interest={interest} />
      ))}
    </div>
  );
}

import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection, doc } from "@firebase/firestore";
import {
  useFetchRealtimeCollection,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";
import { QuickSwapImage } from "./QuickSwapImage";

export function AboutMe() {
  const userID = "test-user";
  const location = "berlin";
  const [profileInfo, setProfileInfo] = useState({});
  const ref = collection(firestore, "accounts", location, userID);
  useFetchRealtimeCollection(ref, setProfileInfo);

  const [profileDoc, setDoc] = useState({});

  const docRef = doc(firestore, "accounts/berlin/users/james");
  useFetchRealtimeDoc(docRef, setDoc);

  console.log("entireDoc", profileDoc);
  console.log("checkpoint", profileDoc?.profilePicture);

  return (
    <div>
 
      <h5>Interests</h5>
      <QuickEditField
        id="name-field" 
        data={profileDoc?.interests} //the question mark stops null pointer error.
        fieldName={"interests"}
        docRef={docRef}
      />
      <br />
    </div>
  );
}
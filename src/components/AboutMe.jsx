import React, { useState } from "react";
import { firestore } from "../firebase";
import { doc } from "@firebase/firestore";
import { useFetchRealtimeDoc } from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";
import { QuickSwapImage } from "./QuickSwapImage";
import { useAuth } from "../contexts/AuthContext";

export function AboutMe() {
  const { currentUser } = useAuth();
  const userID = currentUser.uid;
  const location = "berlin";

  const [profileDoc, setDoc] = useState({});

  const docRef = doc(firestore, `accounts/${location}/users/${userID}`);
  useFetchRealtimeDoc(docRef, setDoc);

  return (
    <div>
      <QuickSwapImage
        data={profileDoc?.profilePicture}
        fieldName={"profilePicture"}
        docRef={docRef}
      />
      <h5>Name</h5>
      <QuickEditField
        id="name-field"
        data={profileDoc?.name}
        fieldName={"name"}
        docRef={docRef}
      />
      <br />
      <h5>Age</h5>
      <QuickEditField
        data={profileDoc?.age}
        fieldName={"age"}
        docRef={docRef}
      />
      <br />
      <h5>About you</h5>
      <QuickEditField
        data={profileDoc?.about}
        fieldName={"about"}
        docRef={docRef}
      />
    </div>
  );
}

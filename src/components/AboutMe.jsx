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
      <QuickSwapImage
        data={profileDoc?.profilePicture}
        fieldName={"profilePicture"}
        docRef={doc(firestore, "accounts/berlin/users/test-user")}
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

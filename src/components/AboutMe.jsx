import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection, doc } from "@firebase/firestore";
import {
  useFetchRealtime,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";
import { QuickSwapImage } from "./QuickSwapImage";

export function AboutMe() {
  const userID = "test-user";
  const location = "berlin";
  const [profileInfo, setProfileInfo] = useState({});
  const ref = collection(firestore, "accounts", location, userID);
  useFetchRealtime(ref, setProfileInfo);

  const [profileDoc, setDoc] = useState();

  const docRef = doc(firestore, "accounts/berlin/test-user/profile-picture");
  useFetchRealtimeDoc(docRef, setDoc);

  return (
    <div>
      <QuickSwapImage
        data={profileDoc}
        docRef={doc(firestore, "accounts/berlin/test-user/profile-picture")}
      />
      <h5>Name</h5>
      <QuickEditField
        id="name-field"
        data={profileInfo[0]?.data}
        fieldName={"name"}
        docRef={profileInfo[0]?.ref}
      />
      <br />
      <h5>Age</h5>
      <QuickEditField
        data={profileInfo[0]?.data}
        fieldName={"age"}
        docRef={profileInfo[0]?.ref}
      />
      <br />
      <h5>About you</h5>
      <QuickEditField
        data={profileInfo[0]?.data}
        fieldName={"about-you"}
        docRef={profileInfo[0]?.ref}
      />
    </div>
  );
}

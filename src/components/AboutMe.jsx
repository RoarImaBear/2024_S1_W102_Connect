import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection, doc } from "@firebase/firestore";
import {
  useFetchRealtime,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";

export function AboutMe() {
  const userID = "test-user";
  const location = "berlin";
  const [profileInfo, setProfileInfo] = useState({});
  const ref = collection(firestore, "accounts", location, userID);
  useFetchRealtime(ref, setProfileInfo);

  const [profileDoc, setDoc] = useState();

  const docRef = doc(firestore, "accounts/berlin/test-user/profile-picture");
  useFetchRealtimeDoc(docRef, setDoc);
  console.log(profileDoc);

  return (
    <div>
      <form action="">
        <label>Name</label>
        <QuickEditField
          data={profileInfo[0]?.data}
          fieldName={"name"}
          docRef={profileInfo[0]?.ref}
        />
        <br />
        <label>Age</label>
        <QuickEditField
          data={profileInfo[0]?.data}
          fieldName={"age"}
          docRef={profileInfo[0]?.ref}
        />
        <br />
        <label>About you</label>
        <QuickEditField
          data={profileInfo[0]?.data}
          fieldName={"about-you"}
          docRef={profileInfo[0]?.ref}
        />
      </form>
    </div>
  );
}

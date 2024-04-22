import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection } from "@firebase/firestore";
import { useFetchRealtime } from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";

export function AboutMe() {
  const userID = "test-user";
  const location = "berlin";
  const [profileInfo, setProfileInfo] = useState({});
  const ref = collection(firestore, "accounts", location, userID);
  useFetchRealtime(ref, setProfileInfo);

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
          fieldName={"age"}
          docRef={profileInfo[0]?.ref}
        />
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { firestore } from "../firebase";
import { doc } from "@firebase/firestore";
import { useFetchRealtimeDoc } from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";
import { QuickSwapImage } from "./QuickSwapImage";
import { useAuth } from "../contexts/AuthContext";

// AboutMe component used by profile page. It loads the userProfile then passes required data to
// QuickSwapImage field and relevant QuickEditFields.
export function AboutMe() {
  const { currentUser } = useAuth();
  const userID = currentUser.uid;
  const location = "berlin";

  const [profileDoc, setDoc] = useState({});

  const profileDocRef = doc(firestore, `accounts/${location}/users/${userID}`);
  useFetchRealtimeDoc(profileDocRef, setDoc);

  return (
    <div id="profile-about-me">
      <div id="profile-top-div">
        <QuickSwapImage
          data={profileDoc?.profilePicture}
          fieldName={"profilePicture"}
          docRef={profileDocRef}
        />
        <div id="profile-top-text">
          <h5>Name</h5>
          <QuickEditField
            id="name-field"
            data={profileDoc?.name}
            fieldName={"name"}
            docRef={profileDocRef}
          />
          <br />
          <h5>Age</h5>
          <QuickEditField
            data={profileDoc?.age}
            fieldName={"age"}
            docRef={profileDocRef}
          />
        </div>
      </div>
      <br />
      <h5>About you</h5>
      <QuickEditField
        data={profileDoc?.about}
        fieldName={"about"}
        docRef={profileDocRef}
      />
    </div>
  );
}

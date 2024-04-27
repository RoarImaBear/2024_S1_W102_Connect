import React, { useRef, useState } from "react";
import Header from "../components/AppHeader";

import { firestore } from "../firebase";
import { collection, doc } from "@firebase/firestore";

import {
  useFetchRealtimeCollection,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions";

export default function Feed() {
  function ProfileCard() {
    const userID = "test-user";
    const location = "berlin";

    const [profileSelection, setProfiles] = useState({});

    // const ref = collection(firestore, "accounts", location);
    // useFetchRealtimeCollection(ref, setProfiles);

    const ref = doc(firestore, "accounts", location);
    useFetchRealtimeDoc(ref, setProfiles);
    console.log(profileSelection)

    return (
      <div id="profile-card">
        <h1>Profile</h1>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div>
        <section className="main-container">
          <ProfileCard />
        </section>
      </div>
    </>
  );
}

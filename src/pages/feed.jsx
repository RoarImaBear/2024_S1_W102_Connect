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
    const userID = "james";
    const location = "berlin";

    const [profileDoc, setDoc] = useState({});

    const docRef = doc(firestore, `accounts/${location}/users/${userID}`);
    useFetchRealtimeDoc(docRef, setDoc);
    console.log(profileDoc);

    return (
      <>
        <div id="profile-card">
          <h1>{profileDoc?.name}</h1>
          <img id="profile-picture" src={profileDoc?.profilePicture} alt="" />
          <h4>{profileDoc?.age}</h4>
          <p>{profileDoc?.about}</p>
          <br />
          <AddButton />
        </div>
      </>
    );
  }

  function BigButton() {
    return (
      <button id="big-button">
        <h1>Next</h1>
      </button>
    );
  }

  function AddButton() {
    return (
      <button>
        <h3>Connect!</h3>
      </button>
    );
  }

  return (
    <>
      <Header />
      <section className="main-container">
        <div id="feed-card">
          <BigButton />
          <ProfileCard />
          <BigButton />
        </div>
      </section>
    </>
  );
}

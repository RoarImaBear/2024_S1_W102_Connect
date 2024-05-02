import React, { useRef, useEffect, useState } from "react";
import Header from "../components/AppHeader";

import { firestore } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "@firebase/firestore";

import { useFetchRealtimeCollection } from "../support-functions/importFunctions";

export default function FeedCarousel() {
  const userID = "sean";
  const location = "berlin";

  const collectionRef = collection(firestore, "accounts", location, "users");
  const [profileFeed, setProfileFeed] = useState({});
  useFetchRealtimeCollection(collectionRef, setProfileFeed);

  const [currentIndex, setIndex] = useState(0);

  function ProfileCard({ profile }) {
    return (
      <>
        <div id="profile-card">
          <h1>{profile?.data?.name}</h1>
          <img
            id="profile-picture"
            src={profile?.data?.profilePicture}
            alt=""
          />
          <h4>{profile?.data?.age}</h4>
          <p>{profile?.data?.about}</p>
          <br />
          <AddButton matchee={profile} />
        </div>
      </>
    );
  }

  function AddButton({ matchee }) {
    const handleConnect = async () => {
      const docRef = doc(collectionRef, `${userID}/matchmaking/contacts`);

      try {
        await updateDoc(docRef, { [matchee?.id]: matchee?.ref });
      } catch (error) {
        if (error.code === "not-found") {
          await setDoc(docRef, { [matchee?.id]: matchee?.ref });
        }
      }
    };

    return (
      <button onClick={() => handleConnect(matchee)}>
        <h3>Connect!</h3>
      </button>
    );
  }

  const handlePrevOrNext = (value) => {
    let profileCount = profileFeed.length;
    let newIndex = currentIndex + value;

    // Add check: Is profile in context? If true, skip to next

    if (newIndex < 0) {
      newIndex = profileCount - 1;
    } else if (newIndex > profileCount - 1) {
      newIndex = 0;
    }

    setIndex(newIndex);
  };

  return (
    <>
      <Header />
      <section className="main-container">
        <div id="feed-card">
          <button id="big-button" onClick={() => handlePrevOrNext(-1)}>
            <h1>Prev</h1>
          </button>
          <ProfileCard profile={profileFeed[currentIndex]} />
          <button id="big-button" onClick={() => handlePrevOrNext(1)}>
            <h1>Next</h1>
          </button>
        </div>
      </section>
    </>
  );
}

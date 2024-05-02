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
import { useAuth } from "../contexts/AuthContext";

import { useFetchRealtimeCollection } from "../support-functions/importFunctions";

export default function FeedCarousel() {
  const location = "berlin";
  const { currentUser } = useAuth();
  const userID = currentUser.uid;
  const userProfileRef = doc(firestore, `accounts/${location}/users/${userID}`);

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
      const userContactsRef = doc(
        collectionRef,
        `${userID}/matchmaking/contacts`
      );
      const matcheeContactsRef = doc(
        collectionRef,
        `${matchee?.id}/matchmaking/contacts`
      );

      try {
        await updateDoc(userContactsRef, { [matchee?.id]: matchee?.ref });
      } catch (error) {
        if (error.code === "not-found") {
          await setDoc(userContactsRef, { [matchee?.id]: matchee?.ref });
        }
      }

      try {
        await updateDoc(matcheeContactsRef, { [userID]: userProfileRef });
      } catch (error) {
        if (error.code === "not-found") {
          await setDoc(matcheeContactsRef, { [userID]: userProfileRef });
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

import React, { useState } from "react";

import { firestore } from "../firebase";
import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

import { useFetchRealtimeCollection } from "../support-functions/importFunctions";

// Functional component used to display 'carousel' of pictures on the feed page.

export default function FeedCarousel() {
  const location = "berlin";
  const { currentUser } = useAuth();
  const userID = currentUser.uid;
  const userProfileRef = doc(firestore, `accounts/${location}/users/${userID}`);

  const profileCollectionRef = collection(
    firestore,
    "accounts",
    location,
    "users"
  );
  const [currentIndex, setIndex] = useState(0);
  const [profileFeed, setProfileFeed] = useState({});
  useFetchRealtimeCollection(profileCollectionRef, setProfileFeed);

  // Profile Card compoennt, displaying relevant user profile.
  function ProfileCard({ profile }) {
    return (
      <>
        <div id="feed-profile-card">
          <h1>{profile?.data?.name}</h1>
          <img id="" src={profile?.data?.profilePicture} alt="" />
          <h4>{profile?.data?.age}</h4>
          <p>{profile?.data?.about}</p>
          <br />
          <AddButton matchee={profile} />
        </div>
      </>
    );
  }

  // Custom button that writes matchee to contacts and currentUser to corresponding matchee's contacts
  function AddButton({ matchee }) {
    const handleConnect = async () => {
      const userContactsRef = doc(
        profileCollectionRef,
        `${userID}/contacts/${matchee?.id}`
      );
      const matcheeContactsRef = doc(
        profileCollectionRef,
        `${matchee?.id}/contacts/${userID}`
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
      <button id="connect-button" onClick={() => handleConnect(matchee)}>
        <h3>Connect!</h3>
      </button>
    );
  }

  // Function for cycling through profiles, incrementing index and resetting it if upper or lower boundary is met
  const handlePrevOrNext = (value) => {
    let profileCount = profileFeed.length;
    let newIndex = currentIndex + value;

    if (newIndex < 0) {
      newIndex = profileCount - 1;
    } else if (newIndex > profileCount - 1) {
      newIndex = 0;
    }

    setIndex(newIndex);
  };

  return (
    <>
      <div id="feed-carousel">
        <button id="big-button" onClick={() => handlePrevOrNext(-1)}>
          <h1>Prev</h1>
        </button>
        <ProfileCard profile={profileFeed[currentIndex]} />
        <button id="big-button" onClick={() => handlePrevOrNext(1)}>
          <h1>Next</h1>
        </button>
      </div>
    </>
  );
}

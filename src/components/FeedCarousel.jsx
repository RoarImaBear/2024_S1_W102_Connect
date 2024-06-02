import React, { useState } from "react";

import { firestore } from "../firebase";
import { collection, doc, setDoc, updateDoc } from "@firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

import { useFetchRealtimeCollection } from "../support-functions/importFunctions";

// Functional component used to display 'carousel' of pictures on the feed page.

export default function FeedCarousel() {
  const location = "berlin";
  // << dropDown component that changes location

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
  const [profileFeed, setProfileFeed] = useState({}); // << Profile Collection
  useFetchRealtimeCollection(profileCollectionRef, setProfileFeed); // << Fetches Profiles

  console.log(profileFeed);

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
  // Time to make this actually work properly....

  // 1. Add self to matchee.pendingMatches
  // 2. Add matchee to ignoreList
  // 3. Add user to matchee's ignoreList
  // 4. AddButton triggers next profile.
  // 5. handlePrevOrNext filters against ignoreList

  function AddButton({ matchee }) {
    const handleConnect = async () => {
      const matcheePendingRef = doc(
        profileCollectionRef,
        `${matchee?.id}/pendingContacts/${userID}`
      );
      const ignoreListRef = doc(
        profileCollectionRef,
        `${userID}/matchmakingFilters/ignoreList`
      );
      const matcheeIgnoreListRef = doc(
        profileCollectionRef,
        `${matchee?.id}/matchmakingFilters/ignoreList`
      );

      // Add user to matchee's pendingContacts
      try {
        await updateDoc(matcheePendingRef, { [userID]: userProfileRef });
      } catch (error) {
        if (error.code === "not-found") {
          await setDoc(matcheePendingRef, { [userID]: userProfileRef });
        }
      }

      // Update ignoreLists
      try {
        await updateDoc(matcheeIgnoreListRef, { [userID]: userProfileRef });
      } catch (error) {
        if (error.code === "not-found") {
          await setDoc(matcheeIgnoreListRef, { [userID]: userProfileRef });
        }
      }
      try {
        await updateDoc(ignoreListRef, { [matchee?.id]: matchee?.ref });
      } catch (error) {
        if (error.code === "not-found") {
          await setDoc(ignoreListRef, { [matchee?.id]: matchee?.ref });
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

    if (profileFeed[newIndex]?.id === userID && value > 0) {
      newIndex++;
    }
    if (profileFeed[newIndex]?.id === userID && value < 0) {
      newIndex--;
    }

    if (newIndex <= 0) {
      newIndex = profileCount - 1;
    } else if (newIndex > profileCount - 1) {
      newIndex = 0;
    }

    setIndex(newIndex);
  };

  return (
    <>
      {/* Add dropdown list of cities. London & Berlin */}
      <div id="feed-carousel">
        <button
          className="big-button"
          id="big-button-left"
          onClick={() => handlePrevOrNext(-1)}
        >
          <h1>🛫</h1>
        </button>
        <ProfileCard profile={profileFeed[currentIndex]} />
        <button className="big-button" onClick={() => handlePrevOrNext(1)}>
          <h1>🛫</h1>
        </button>
      </div>
    </>
  );
}

import React, { useState } from "react";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { useFetchRealtimeDoc } from "../support-functions/importFunctions";
import plusIcon from "../images/plus-icon.svg";
import declineIcon from "../images/decline-icon.svg";
import { useAuth } from "../contexts/AuthContext";

// Functinoal component that displays the user profiles stored in PendingContact collection
export function PendingContactCard({ contactDocRef }) {
  const profileCollectionRef = collection(
    firestore,
    "accounts",
    "berlin",
    "users"
  );
  const [contact, setContact] = useState({});
  const { currentUser } = useAuth();

  // Current user variables
  const userID = currentUser.uid;
  const userDocRef = doc(profileCollectionRef, userID);
  const userNewContactRef = doc(
    profileCollectionRef,
    userID,
    "contacts",
    contactDocRef?.id
  );
  const userPendingContactRef = doc(
    profileCollectionRef,
    userID,
    "pendingContacts",
    contactDocRef?.id
  );
  // Matchee user variables
  const matcheeNewContactRef = doc(contactDocRef, "contacts", userID);
  const matcheePendingContactRef = doc(
    contactDocRef,
    "pendingContacts",
    userID
  );

  // ContactDoc is fetched.
  useFetchRealtimeDoc(contactDocRef, setContact);

  // Method for accepting a pending match
  // 1. Adds users to contacts
  // ... Add users to ignorLists (already done when matchRequest sent.: simply remove pending contact)
  // 2. Remove users from pendingContacts

  const handleAccept = async () => {
    // Update contact lists: 1a) for user; 1b) formatchee
    try {
      await updateDoc(userNewContactRef, {
        [contactDocRef?.id]: contactDocRef,
      });
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(userNewContactRef, {
          [contactDocRef?.id]: contactDocRef,
        });
      }
    }
    try {
      await updateDoc(matcheeNewContactRef, {
        [userID]: userDocRef,
      });
    } catch (error) {
      if (error.code === "not-found") {
        await setDoc(matcheeNewContactRef, {
          [userID]: userDocRef,
        });
      }
    }

    // Update pendingContacts collections 2a) remove for user 2b) remove for matchee
    try {
      await deleteDoc(userPendingContactRef);
    } catch (error) {
      console.log("Cannot remove pendingMatch doc for user ", error);
    }
    try {
      await deleteDoc(matcheePendingContactRef);
    } catch (error) {
      console.log("Cannot remove pendingMatch for matchee ", error);
    }
  };

  // Method for declining a user request
  // ... Add user to ignoreList (User is already on ignoreList (feedCarousel))
  // 2. Remove user from pendingContacts
  const handleDecline = async () => {
    try {
      await deleteDoc(userPendingContactRef);
    } catch (error) {
      console.log("Cannot remove pendingMatch doc for user ", error);
    }

    try {
      await deleteDoc(matcheePendingContactRef);
    } catch (error) {
      console.log("Cannot remove pendingMatch for matchee ", error);
    }
  };

  return (
    <div
      data-testid="PendingContactCard"
      id="pending-contact-card"
      className="matches"
    >
      <div className="match-card img" id="pending-match-card">
        <h2>{contact?.name}</h2>
        {contact?.profilePicture && (
          <img src={contact?.profilePicture} alt="Profile" />
        )}
        <button className="icon-button" id="accept" onClick={handleAccept}>
          <img src={plusIcon} id="button-svg" alt="" />
        </button>
        <button className="icon-button" id="decline" onClick={handleDecline}>
          <img src={declineIcon} id="button-svg" alt="" />
        </button>
        <p>{contact?.age}</p>
      </div>
    </div>
  );
}

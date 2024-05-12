import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { useFetchRealtimeDoc } from "../support-functions/importFunctions"; // Import the useFetchRealtimeDoc hook
import Header from "../components/AppHeader";
import { ContactCard } from "../components/ContactCard";

import { useAuth } from "../contexts/AuthContext";

function Matches() {
  const { currentUser } = useAuth();
  const userID = currentUser.uid;
  const location = "berlin";

  const [contacts, setContacts] = useState({});
  const [contact, setContact] = useState({});
  const [contactsArray, setContactsArray] = useState([]);

  // fetches contacts from Firestore
  useFetchRealtimeDoc(
    doc(firestore, `accounts/${location}/users/${userID}/matchmaking/contacts`),
    setContacts
  );

  //convert contact objects into an array
  useEffect(() => {
    let outputArray = [];
    if (contacts) {
      // for (const [key, value] of Object.entries(contacts))
      //   outputArray.push(value);
      outputArray = Object.values(contacts);
    }
    // console.log(outputArray);
    setContactsArray(outputArray);
  }, [contacts]);

  console.log(contactsArray);

  // Subscribe to changes for the "user" contact
  useEffect(() => {
    if (contacts && contacts[userID]) {
      const unsubscribe = onSnapshot(contacts[userID], (doc) => {
        if (doc.exists) {
          const fetchedData = doc.data();
          setContact(fetchedData);
        } else {
          console.log("Failed to load doc");
        }
      }); //unsubscribe from listener
      return () => unsubscribe();
    }
  }, [contacts]);

  return (
    <>
      <Header />
      <div id="background"></div>
      <section className="main-section">
        {contactsArray.map((userID, index) => (
          <ContactCard key={index} userID={userID} />
        ))}
      </section>
    </>
  );
}

export default Matches;

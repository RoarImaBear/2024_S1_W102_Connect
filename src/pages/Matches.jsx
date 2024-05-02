import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import { useFetchRealtimeDoc } from "../support-functions/importFunctions"; // Import the useFetchRealtimeDoc hook
import Header from "../components/AppHeader";
import { ContactCard } from "../components/ContactCard";

function Matches() {
  const location = "berlin";
  const userID = "test-user";

  const [contacts, setContacts] = useState({});
  const [contact, setContact] = useState({});
  const [contactsArray, setContactsArray] = useState([]);

  // Fetch contacts from Firestore
  useFetchRealtimeDoc(
    doc(firestore, `accounts/${location}/users/${userID}/matchmaking/contacts`),
    setContacts
  );

  useEffect(() => {
    const outputArray = [];
    if (contacts) {
      for (const [key, value] of Object.entries(contacts))
        outputArray.push(value);
    }
    // console.log(outputArray);
    setContactsArray(outputArray);
  }, [contacts]);

  console.log(contactsArray);

  // Subscribe to changes for the "test-user" contact
  useEffect(() => {
    if (contacts && contacts[userID]) {
      const unsubscribe = onSnapshot(contacts[userID], (doc) => {
        if (doc.exists) {
          const fetchedData = doc.data();
          setContact(fetchedData);
        } else {
          console.log("Failed to load doc");
        }
      });
      return () => unsubscribe();
    }
  }, [contacts]);

  return (
    <>
      <Header />
      <section className="main-container">
        <h1 style={{ textAlign: "center", marginTop: "10px" }}>Matches Page</h1>
        <h2 style={{ textAlign: "center", marginTop: "10px" }}>
          Current Matches
        </h2>

        {contactsArray.map((userID, index) => (
          <ContactCard key={index} userID={userID} />
        ))}
      </section>
    </>
  );
}

export default Matches;
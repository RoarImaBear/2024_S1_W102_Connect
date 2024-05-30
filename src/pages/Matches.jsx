import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";
import {
  useFetchRealtimeCollection,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions"; // Import the useFetchRealtimeDoc hook
import Header from "../components/AppHeader";
import { ContactCard } from "../components/ContactCard";
import Chat from "../components/Chat/chat";
import { useAuth } from "../contexts/AuthContext";
import { PendingContactCard } from "../components/PendingContactCard";

// Changes made to work with Firestore contacts collection -- ready for chat implementation
function Matches() {
  const { currentUser } = useAuth();
  const userID = currentUser.uid;
  const location = "berlin";

  const contactsColRef = collection(
    firestore,
    `accounts/${location}/users/${userID}/contacts`
  );

  const pendingContactsColRef = collection(
    firestore,
    `accounts/${location}/users/${userID}/pendingContacts`
  );

  const [contactsCol, setContactsCol] = useState([]);
  const [pendingContactsCol, setPendingContactsCol] = useState([]);

  useFetchRealtimeCollection(contactsColRef, setContactsCol);
  useFetchRealtimeCollection(pendingContactsColRef, setPendingContactsCol);

  return (
    <>
      <Header />
      <div id="background"></div>
      <section className="main-section">
        {pendingContactsCol.map((contact, index) => (
          <PendingContactCard
            key={index}
            contactDocRef={doc(
              firestore,
              `accounts/berlin/users/${contact?.id}`
            )}
          />
        ))}
        {contactsCol.map((contact, index) => (
          <ContactCard
            key={index}
            contactDocRef={doc(
              firestore,
              `accounts/berlin/users/${contact?.id}`
            )}
          />
        ))}
        <div className="chat-container">
          <Chat />
        </div>
      </section>
    </>
  );
}

export default Matches;

// const [contacts, setContacts] = useState({});
// const [contact, setContact] = useState({});
// const [contactsArray, setContactsArray] = useState([]);

// useFetchRealtimeDoc(
//   doc(firestore, `accounts/${location}/users/${userID}/matchmaking/contacts`),
//   setContacts
// );

// Subscribe to changes for the "user" contact
// useEffect(() => {
//   if (contacts && contacts[userID]) {
//     const unsubscribe = onSnapshot(contacts[userID], (doc) => {
//       if (doc.exists) {
//         const fetchedData = doc.data();
//         setContact(fetchedData);
//       } else {
//         console.log("Failed to load doc");
//       }
//     }); //unsubscribe from listener
//     return () => unsubscribe();
//   }
// }, [contacts]);

// useEffect(() => {
//   let outputArray = [];
//   if (contacts) {
//     outputArray = Object.values(contacts);
//   }
// for (const [key, value] of Object.entries(contacts))
//   outputArray.push(value);
//   setContactsArray(outputArray);
// }, [contacts]);

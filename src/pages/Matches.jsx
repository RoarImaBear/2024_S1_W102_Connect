import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
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
  const [selectedChatroomRef, setSelectedChatroomRef] = useState(null);

  useFetchRealtimeCollection(contactsColRef, setContactsCol);
  useFetchRealtimeCollection(pendingContactsColRef, setPendingContactsCol);

  const handleContactCardClick = async (clickedUserID) => {
    const currentUserDocRef = doc(
      firestore,
      `accounts/${location}/users/${userID}/contacts/${clickedUserID}`
    );
    const clickedUserDocRef = doc(
      firestore,
      `accounts/${location}/users/${clickedUserID}/contacts/${userID}`
    );

    try {
      const currentUserDocSnap = await getDoc(currentUserDocRef);
      if (currentUserDocSnap.exists()) {
        const chatroomRef = currentUserDocSnap.data().chatroomRef;
        if (chatroomRef) {
          //Chatroom exists, subscribe to it
          setSelectedChatroomRef(chatroomRef);
          return;
        }
      }

      //Generate chatroom ID
      const chatroomID = generateChatroomID(userID, clickedUserID);
      //Create participants array
      const participants = [userID, clickedUserID];

      //Create chatroom document with participants field
      const newChatroomRef = doc(firestore, "chats", chatroomID);
      await setDoc(newChatroomRef, { participants });

      // Update chatroomRef in both users' contact documents
      await Promise.all([
        setDoc(currentUserDocRef, { chatroomRef: newChatroomRef }, { merge: true }),
        setDoc(clickedUserDocRef, { chatroomRef: newChatroomRef }, { merge: true }),
      ]);

      setSelectedChatroomRef(newChatroomRef);
    } catch (error) {
      console.error("Error handling contact card click: ", error);
    }
  };

  const generateChatroomID = (userId1, userId2) => {
    const prefix = userId1.slice(0, 3) + userId2.slice(0, 3);
    return prefix;
  };

  return (
    <>
      <Header />
      <div id="background"></div>
      <section className="main-section">
        <div className="contacts-container">
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
              onClick={() => handleContactCardClick(contact.id)}
            />
          ))}
        </div>
        <div className="chat-container">
          {selectedChatroomRef && <Chat chatroomRef={selectedChatroomRef}/>}
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

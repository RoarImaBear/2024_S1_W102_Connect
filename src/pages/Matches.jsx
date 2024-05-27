import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { useFetchRealtimeCollection } from "../support-functions/importFunctions";
import Header from "../components/AppHeader";
import { ContactCard } from "../components/ContactCard";
import Chat from "../components/Chat/chat";
import { useAuth } from "../contexts/AuthContext";

function Matches() {
  const { currentUser } = useAuth();
  const userID = currentUser.uid;
  const location = "berlin";

  const contactsColRef = collection(
    firestore,
    `accounts/${location}/users/${userID}/contacts`
  );

  const [contactsCollection, setContactsCollection] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  useFetchRealtimeCollection(contactsColRef, setContactsCollection);

  // Subscribe to the testChatroom
  useEffect(() => {
    const chatroomDocRef = doc(firestore, "chatrooms/testChatroom");

    const unsubscribe = onSnapshot(chatroomDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setChatMessages(data.messages || []);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleSendMessage = async (message) => {
    const chatroomDocRef = doc(firestore, "chatrooms/testChatroom");
    await updateDoc(chatroomDocRef, {
      messages: arrayUnion({
        text: message,
        createdAt: new Date(),
        user: currentUser.displayName,
      }),
    });
  };

  return (
    <>
      <Header />
      <div id="background"></div>
      <section className="main-section">
        <div className="contacts-container">
          {contactsCollection.map((contact, index) => (
            <ContactCard
              key={index}
              contactDocRef={doc(
                firestore,
                `accounts/${location}/users/${contact?.id}`
              )}
            />
          ))}
        </div>
        <div className="chat-container">
          <Chat messages={chatMessages} onSendMessage={handleSendMessage} />
        </div>
      </section>
    </>
  );
}

export default Matches;

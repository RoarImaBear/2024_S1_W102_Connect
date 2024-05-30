import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

//functional component contact card taking in user ID for fetching contact information
export function ContactCard({ contactDocRef }) {
  const [contact, setContact] = useState({});

  //fetches contact information when component mounts
  useEffect(() => {
    const unsubscribe = onSnapshot(contactDocRef, (doc) => {
      if (doc.exists) {
        const fetchedData = doc.data();
        //updates the state with data fetched from firestore
        setContact(fetchedData);
      } else {
        console.log("Failed to load doc");
      }
    }); //unsubscribes from Firestore listener
    return () => unsubscribe();
  }, []);

  return (
    <div data-testid="contactCard" className="matches">
      {/* Display match contact information such as name, age and profile picture*/}
      <div className="match-card img">
        <h2>{contact?.name}</h2>
        {contact?.profilePicture && (
          <img src={contact?.profilePicture} alt="Profile" />
        )}
        <p>{contact?.age}</p>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

export function ContactCard({ userID }) {
  const [contact, setContact] = useState({});
  useEffect(() => {
    const unsubscribe = onSnapshot(userID, (doc) => {
      if (doc.exists) {
        const fetchedData = doc.data();
        setContact(fetchedData);
      } else {
        console.log("Failed to load doc");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="matches">
      {/* Display contact information */}
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

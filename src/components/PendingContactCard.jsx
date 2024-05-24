import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

export function PendingContactCard({ userID }) {
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
    <div data-testid="PendincContactCard" className="matches">
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

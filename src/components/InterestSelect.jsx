import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection, doc } from "@firebase/firestore";
import {
  useFetchRealtimeCollection,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";
import { QuickSwapImage } from "./QuickSwapImage";

export function Interests(userID, location) {
  const usersRef = collection(firestore, `accounts/${location}/users/${userID}`);

  const [profileDoc, setDoc] = useState({});

  const docRef = doc(firestore, "accounts/berlin/users/james");
  const interestsRef = collection(firestore, 'keys/interests-key');

  useFetchRealtimeDoc(docRef, setDoc);

  console.log("entireDoc", profileDoc);

  const InterestsList = ({interestsRef}) => {
    return (
      <div>
          {interestsRef.interests.map((interest,index) => (
            <InterestCard key={index} interest={interest} />
          ))}
      </div>
    );
  }

  const InterestCard = ({interest}) => {
    const handleDelete = async () => {
      try{
        await deleteDoc(interestsRef, {interest});
        console.log("Document successfully deleted!",interestsRef,interest);
      }
      catch(error){
        console.error("Error removing document: ", error);
      }
    };
    return
    (
      <div>
        <h5>Interests</h5>
        <QuickEditField
        data={interest?.data?.interests} //the question mark stops null pointer error.
        fieldName={"interests"}
        docRef={docRef}
      />
      <br />
      </div>
    );
  }


  return (
    <div>
 
      
    </div>
  );
}
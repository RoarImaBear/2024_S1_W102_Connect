import React, { useState } from "react";
import { firestore } from "../firebase";
import { collection, doc, deleteDoc, updateDoc,setDoc } from "@firebase/firestore";
import {
  useFetchRealtimeCollection,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";
import { QuickSwapImage } from "./QuickSwapImage";

  function ListofInterests(interestsRef)
  {
    const doc = interestsRef.get();
    if (!doc.exists) {
      console.log('No such document!')
    } else 
    {
      let i = 0;
      doc.data().interests.forEach((interest) => 
      {
        ListofInterests[i]=interest;
        i++;
      });
    }
  }

  export function InterestSelect(userID, location) 
  {
  //collection("accounts").document("${location}").collection("users").document("${userID}");
 // const usersRef = document(firestore, 'accounts/berlin/users/james');
  const docRef = doc(firestore, `accounts/${location}/users/${userID}`);
  
  const [profileDoc, setDoc] = useState({});

  //const docRef = doc(firestore, "accounts/berlin/users/james");
  const interestsRef = collection(firestore, `keys/interests-key/interests`);

  useFetchRealtimeDoc(docRef, setDoc);

  console.log("entireDoc", profileDoc);

  ListofInterests();

  /*interests: [
    {
      id: 1,
      interest: "Music"
    },
    {
      id: 2,
      interest: "Art"
    },
    {
      id: 3,
      interest: "Sports"
    },
    {
      id: 4,
      interest: "Food"
    }
  ];*/



  const InterestsList = ({interestsRef}) => {
    return 
    (
      <div>
          {interestsRef.interests.map((interest,index) => (
            <InterestCard key={index} interest={interest} />
          ))}
      </div>
    );
  }

  const InterestCard = ({interest}) => {
    const handleDelete = async () => {
      try
      {
        await deleteDoc(interestsRef, {interest});
        console.log("Document successfully deleted!",interestsRef,interest);
      }
      catch(error)
      {
        console.error("Error removing document: ", error);
      }
    };
    return
    (
      <div>
       //refer to interestlist function 

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
      <InterestsList interestsRef={interestsRef}/>

    </div>
  );
}
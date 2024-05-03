import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import {
  doc,
  setDoc,
  updateDoc
} from "@firebase/firestore";
import {
       useFetchRealtimeDoc
     } from "../support-functions/importFunctions";

// Import statements for other dependencies here

const userID = "test-user";
const location = "berlin";
const interestsRef = doc(firestore, `accounts/${location}/users/${userID}/user-interests/test`);

async function removeInterestFromDB(interest) {  
    // Using while loop to remove all occurrences of interest
    try {
        await updateDoc(interestsRef, { [interest]: false });
        console.log("checkpoint 1")
      } catch (error) {
        if (error.code === "not-found") {
          await setDoc(interestsRef, { [interest]: false }); //error here
          console.log("checkpoint 2")
        }
      }
    
}

function UserInterestButton({ interest}) {
    console.log("display1");
  return(
    <div>
      <button onClick={() => removeInterestFromDB(interest)}>{interest}</button>
    </div>
  );
}

export function Userinterests() {
  const [userInterestObject, setUserInterestObject] = useState({});
  const [profileDoc, setProfileDoc] = useState({});

    const interestsRef = doc(firestore, `accounts/${location}/users/${userID}/user-interests/test`);

    // Assuming useFetchRealtimeDoc is a custom hook that updates userInterestObject
    useFetchRealtimeDoc(interestsRef, setUserInterestObject);

    const userInterestsArray = Object.keys(userInterestObject);

    const userInterestsArray1 = Object.values(userInterestObject);
    for (let i = 0; i < userInterestsArray1.length; i++) {
        userInterestsArray.push(userInterestsArray1[i])
    }
    
    // Filter out interests that are false
    const trueInterestsArray = userInterestsArray.filter(interest => userInterestObject[interest]);
    
    console.log(userInterestsArray);


    return (
        <div>
          <p>Your Interests</p>
          {trueInterestsArray.map((interest, index) => (
            <UserInterestButton key={index} interest={interest}/>
          ))}
        </div>
      );
}














// import React, { useState } from "react";
// import { firestore } from "../firebase";
// import {
//   doc,
//   updateDoc,
//   deleteDoc,
//   setDoc,
// } from "@firebase/firestore";
// import {
//   useFetchRealtimeDoc,
// } from "../support-functions/importFunctions";


// const userID = "test-user";
// const location = "berlin";

// function removeInterestFromArray({Array, interest}) {  
//     const index = Array.indexOf(interest);
//     while(Array[index] != null)
//     {
//       const x = Array.splice(index, 1);
//     }
// }

// function UserInterestButton({Array,interest}) 
// {
// return(
//   <div>
//     <button onClick={() => removeInterestFromArray(Array, interest)}>{interest}</button>
//   </div>
// );
// }

// export function Userinterests()
// {
//     const userInterestObject = useState();
//     const setUserInterestobject = useState();

//     const interestsRef = doc(firestore, `accounts/${location}/users/${userID}/user-interests/test`);
//     const profileDoc = [profileDoc, setDoc] = useState({});
    

//     useFetchRealtimeDoc(interestsRef, setUserInterestobject);

//     const userInterestsArray = Object.entries(userInterestObject);
//     let interests = [];
//     return
//     (
//         <div>
//             {
//                 userInterestsArray?.interests?.map((interest,index) => (
//                     <UserInterestButton key={index} Array={userInterestsArray} interest={interest}/>
//                 ))
//             }
//         </div>
//     );
// }
import React, { useState } from "react";
import { firestore } from "../firebase";
import {
  collection,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from "@firebase/firestore";
import {
  useFetchRealtimeCollection,
  useFetchRealtimeDoc,
} from "../support-functions/importFunctions";
import { QuickEditField } from "./QuickEditField";
import { QuickSwapImage } from "./QuickSwapImage";

function LoadInterests(interestsRef, ListofInterests) {
  return;
  {
    const doc = interestsRef.once("value").then((datasnapshot) => {
      console.log("Fetching interests");
      if (!datasnapshot.exists()) {
        return {};
      }
      ListofInterests = datasnapshot.val();
      return ListofInterests;
    });
  }
}

function InterestCheckbox({ interest }) {
  console.log(interest);
  return (
    <div>
      <p>{interest}</p>
    </div>
  );
}

const handleCheckboxChange = (
  event,
  selectedInterests,
  setSelectedInterest
) => {
  const checkedInterest = event.target.value;
  if (event.target.checked) {
    setSelectedInterest([...selectedInterests, checkedInterest]);
  } else {
    setSelectedInterest(
      selectedInterests.filter((id) => id !== checkedInterest)
    );
  }
};

const SelectInterestList = ({ interests }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  return;
  <div>
    {interests.map((interest) => (
      <InterestCheckbox interest={interest} />
    ))}
  </div>;
};

const UserInteraction = (selectedInterests) => {
  return <div></div>;
};

export function InterestSelect() {
  const userID = "test-user";
  const location = "berlin";

  const [interestsKeyArray, setInterestsArray] = useState([]);
  const interestsKeyRef = doc(firestore, `keys/interests-key`);

  const docRef = doc(firestore, `accounts/${location}/users/${userID}`);

  const [profileDoc, setDoc] = useState({});

  useFetchRealtimeDoc(interestsKeyRef, setInterestsArray);
  console.log("interstsKey", interestsKeyArray?.interests);

  //const docRef = doc(firestore, "accounts/berlin/users/james");

  console.log("entireDoc", profileDoc);
  let interests = [];
  //interests = LoadInterests(interestsRef, interests);

  return (
    <div>
      {interestsKeyArray?.interests?.map((interest, index) => (
        <InterestCheckbox key={index} interest={interest} />
      ))}
    </div>
  );
}

//collection("accounts").document("${location}").collection("users").document("${userID}");
// const usersRef = document(firestore, 'accounts/berlin/users/james');

// <SelectInterestList interestsRef={interestsRef} />}

// function ManageState(){

//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const handleCheckboxChange = ((event) => {
//   const checkedInterest = event.target.value;
//   if(event.target.checked){
//     setSelectedInterests([...selectedInterests,checkedInterest])
//   }else{
//    setSelectedInterests(selectedInterests.filter(id=>id !== checkedInterest))
//     }
//     <input type="Checkbox"
//       value={interests.interest}
//       checked={selectedInterests.includes(interests.interest)}
//       onChange={(event) => handleCheckboxChange(event)}/>
//   });
// }

// const InterestCard = ({interest}) => {
//   const handleDelete = async () => {
//     try
//     {
//       await deleteDoc(interestsRef, {interest});
//       console.log("Document successfully deleted!",interestsRef,interest);
//     }
//     catch(error)
//     {
//       console.error("Error removing document: ", error);
//     }
//   };
//   return
//   (
//     <div>
//      //refer to interestlist function

//       <h5>Interests</h5>
//       <QuickEditField
//       data={interest?.data?.interests} //the question mark stops null pointer error.
//       fieldName={"interests"}
//       docRef={docRef}
//     />
//     <br />
//     </div>
//   );
// }

//               interests.map((interests) => (
//                <label key={interests.id}>
//                  <input type="checkbox" value={interests.interest} />
//                  {interests.interest}
//                  {/* <InterestCard interest={interest} /> */}
//                   </label>
//               ))

//              const handleCheckboxChange = ((event) =>
//              {
//              const checkedInterest = event.target.value;
//              if(event.target.checked){
//              setSelectedInterests([...selectedInterests,checkedInterest])
//              }else {
//              setSelectedInterests(selectedInterests.filter(id=>id !== checkedInterest))
//              }
//            });

//            <input type="Checkbox"
//            value={interests.interest}
//            checked={selectedInterests.includes(interests.interest)}
//            onChange={(event) => handleCheckboxChange(event)}/>

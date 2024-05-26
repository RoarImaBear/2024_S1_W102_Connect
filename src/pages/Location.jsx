import React, { useState } from "react";
import { firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import { collection,doc,} from "@firebase/firestore";
import { useFetchRealtimeDoc } from "../support-functions/importFunctions";



 function SelectLocationForm({ navigate, locations }) {
  function handleSubmit(event) {
    // Handle form submission here
    // For example, navigate to profile page with selected location
    navigate("/profile");
  }

  return (
    <div>
        <label>Select a location: 
        <select value="location" onClick={handleSubmit}>
          <option location="not selected">pick a city</option>
          <option location="Berlin">Berlin</option>
          <option location="London">London</option>
          <option location="Auckland">Auckland</option>
          <option location="Los Angeles">Los Angeles</option>
          <option location="New York">New York</option>
          {locations.map((location, index) => (Options({ location })))}
        </select>
        </label>
        <br />
    </div>
  );
}

function Options({ location }) {
  return (
    <option value={location}>{location}</option>
  );
}


export default function SelectLocation() {
  const navigate = useNavigate();
  const [locationObject, setLocationObject] = useState({});

const locationRef = collection(firestore, 'accounts');

useFetchRealtimeDoc(locationRef, setLocationObject);

const locations = Object.keys(locationObject);
const locations1 = Object.values(locationObject);
const locationsArray = [...locations, ...locations1.filter(location => locationObject[location])];

  console.log(locationsArray);
  return (
    <>
    <div>
      <p>Choose a location</p>
        <SelectLocationForm navigate={navigate} locations={locations} />
    </div>
    </>
  );
}



















// import React {useState} from "react";
// import { firestore } from "../firebase";
// import { doc, setDoc, updateDoc } from "@firebase/firestore";
// import { useFetchRealtimeDoc } from "../support-functions/importFunctions";
// //location function
// function SelectLocationForm({ location }) {
//   //get list of locations
// function onClick() {
//   const userlocation = location;
//   navigate("/profile");
// }
//   return (
//     <div>
//       <form action={onClick()}>
//         <label>Select a location: </label>
//         <Select name="location" id="location">
//           <option value={location}>{location}</option>
//         </Select>
//         <br></br>
//         <input type="submit" value="Submit" />
//         </form>
//     </div>
//   );
// }


// export default function selectLocation() {
//   //prompt user to select a location
//   const [locationObject, setLocationObject] = useState({});
//   const [locationDoc, setLocationDoc] = useState({});

//   const locationRef = doc(
//     firestore,'accounts');

//   console.log(locationRef);

//   // Assuming useFetchRealtimeDoc is a custom hook that updates userInterestObject
//   useFetchRealtimeDoc(locationRef, setLocationObject);
  
//   const locations = Object.keys(locationObject);
//   const locations1 = Object.values(locationObject);
//   for(let i = 0; i < locations1.length; i++) {
//     locations.push(locations1[i]);
//   }
 
//   locationsArray = locations.filter(location => locationObject[location])
//   console.log(locationsArray);
//   return(
//   <div>
//     <p>Choose a location</p>
//     {
//     locationsArray.map((location, index) => 
//     (
//     <SelectLocationForm key={index} location={location} />
//     ))}
//   </div>
//   );
//   // then once user has selected a location we then add the user to that pool of people to match with
//   //thi s is a middle page function
// }
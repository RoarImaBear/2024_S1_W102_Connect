import React, { useRef } from "react";
import Header from "../components/AppHeader";

import { addDoc, deleteDoc } from "@firebase/firestore";
import { AboutMe } from "../components/AboutMe";
import { InterestSelect } from "../components/InterestSelect";

export default function Profile() {
  return (
    <>
      <Header />
      <div>
        <section className="main-container">
          <AboutMe />
          <InterestSelect />
          <Location />

          {/* location */}
          <div> 

          </div>

          {/* The form */}
          <div>
            {
            <form action = "profile.jsx" method = "post">
            <label>Pick your location</label>
            <select name="location" id="location">
              <option value="location1">location1</option>
              <option value="location2">location2</option>
              </select>
            <label>Please Enter a Description</label>
            <input type ="String" ref={Description}/>
            
            <label htmlFor ="interests">Pick your interests</label>
            <select name="interests" id="interests">
              <option value="interest1">interest1</option>
              </select>

            <input type="submit" value="Submit"/>
            </form>
            }
          </div>

          {/* Interests */}
          <div>

            
            <div></div>
          </div>
        </section>
      </div>
    </>
  );
}

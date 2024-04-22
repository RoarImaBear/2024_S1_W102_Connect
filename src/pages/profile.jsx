import React, { useRef } from "react";
import Header from "../components/AppHeader";

import { addDoc, deleteDoc } from "@firebase/firestore";
import { AboutMe } from "../components/AboutMe";

export default function Profile() {
  return (
    <>
      <Header />
      <div>
        <section className="main-container">
          <AboutMe />
          {/* location */}
          <div></div>

          {/* Description */}
          <div>
            <label>Please Enter a Description</label>
            {/* <input type ="String" ref={Description}/> */}
          </div>

          {/* Interests */}
          <div>
            {/* Pick from interests list */}
            <div>
              <label htmlFor="interests">Pick your interests</label>
              {/* pick your interests this will be dynamically polulated  */}
              <select name="interests" id="interests">
                <option value="interest1">interest1</option>
              </select>
            </div>

            {/* current interests  */}
            <div></div>
          </div>
        </section>
      </div>
    </>
  );
}

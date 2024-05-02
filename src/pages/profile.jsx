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
        </section>
      </div>
    </>
  );
}

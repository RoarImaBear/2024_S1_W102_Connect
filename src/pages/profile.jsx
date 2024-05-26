import React from "react";
import Header from "../components/AppHeader";
import { AboutMe } from "../components/AboutMe";
import { InterestSelect } from "../components/InterestSelect";
import { Userinterests } from "../components/Userinterests";

// Profile page displaying relevant components.
export default function Profile() {
  return (
    <>
      <Header />
      <div id="background"></div>
      <section className="main-section" id="profile-main-section">
        <AboutMe />
        <Userinterests />
        <InterestSelect />
      </section>
    </>
  );
}

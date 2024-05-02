import React, { useRef, useState } from "react";
import Header from "../components/AppHeader";

import { firestore } from "../firebase";
import { collection, doc } from "@firebase/firestore";

import FeedCarousel from "../components/FeedCarousel";

export default function Feed() {
  return (
    <>
      <Header />
      <div>
        <section className="main-container">
          <FeedCarousel />
        </section>
      </div>
    </>
  );
}

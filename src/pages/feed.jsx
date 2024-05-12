import React from "react";
import Header from "../components/AppHeader";

import FeedCarousel from "../components/FeedCarousel";

export default function Feed() {
  return (
    <>
      <Header />
      <div id="background"></div>
      <section className="main-section" id="feed-main-section">
        <FeedCarousel />
      </section>
    </>
  );
}

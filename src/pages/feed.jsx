import React from "react";
import Header from "../components/AppHeader";

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

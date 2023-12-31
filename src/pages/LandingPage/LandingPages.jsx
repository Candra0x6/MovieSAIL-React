import React from "react";
import SliderLanding from "../../components/SliderLanding";
import Hero from "./hero/Hero";
import TopPeople from "./hero/TopPeople";

export default function LandingPages() {
  return (
    <>
      <section className="bg-[#121139]">
        <SliderLanding />
      </section>
      <section
        id="discover"
        className="overflow-hidden scroll-smooth bg-[#121139] pt-10 pb-20"
      >
        <Hero />
      </section>
      <section id="top-people" className="bg-[#121139] pb-10">
        <TopPeople />
      </section>
    </>
  );
}

import React from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SectionHeader = ({ markerCount, markerTitle, sectionTitle }) => {
  let markerEl = React.useRef(null);
  let titleEl = React.useRef(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      markerEl,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: markerEl,
          start: "bottom bottom",
          end: "bottom bottom-=100",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      }
    );
    gsap.fromTo(
      titleEl,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: titleEl,
          start: "bottom bottom",
          end: "bottom bottom-=100",
          toggleActions: "play none none reverse",
          // markers: true,
        },
      }
    );
  }, []);

  return (
    <div className="section-header">
      <span className="section-header__marker" ref={e => (markerEl = e)}>
        <span className="section-header__marker-count">
          {markerCount + "."}
        </span>
        <span className="section-header__marker-title">{markerTitle}</span>
      </span>
      <h2 className="section-header__title" ref={e => (titleEl = e)}>
        {sectionTitle}
      </h2>
    </div>
  );
};

SectionHeader.propTypes = {
  markerCount: PropTypes.string,
  markerTitle: PropTypes.string,
  sectionTitle: PropTypes.string,
};

export default SectionHeader;

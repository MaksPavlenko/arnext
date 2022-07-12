import React from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ReactMarkdown = require("react-markdown");

const AboutHistory = ({ markerCount, markerTitle, description }) => {
  let itemEl = React.useRef([]);
  itemEl.current = [];

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    itemEl.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addToRefs = el => {
    if (el && !itemEl.current.includes(el)) {
      itemEl.current.push(el);
    }
  };
  return (
    <section className="story">
      <div className="story__wrapper">
        <p className="story__marker" ref={addToRefs}>
          <span className="story__count">{markerCount}</span>
          {markerTitle}
        </p>
        <div className="markdown-components" ref={addToRefs}>
          <ReactMarkdown children={description} />
        </div>
      </div>
    </section>
  );
};

AboutHistory.propTypes = {
  markerCount: PropTypes.string,
  markerTitle: PropTypes.string,
};

export default AboutHistory;

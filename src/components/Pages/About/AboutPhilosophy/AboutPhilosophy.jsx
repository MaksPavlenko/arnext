import React from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SectionHeader from "../../../UI/SectionHeader/SectionHeader";

const ReactMarkdown = require("react-markdown");

const AboutPhilosophy = ({
  markerCount,
  markerTitle,
  sectionTitle,
  description,
}) => {
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
          delay: 0.5,
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
    <section className="philosophy">
      <div className="about-us__wrapper">
        <div className="philosophy__container">
          <SectionHeader
            markerCount={markerCount}
            markerTitle={markerTitle}
            sectionTitle={sectionTitle}
          />
          <div className="philosophy__content">
            <div className="markdown-components" ref={addToRefs}>
              <ReactMarkdown children={description} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutPhilosophy.propTypes = {
  markerCount: PropTypes.string,
  markerTitle: PropTypes.string,
  sectionTitle: PropTypes.string,
};

export default AboutPhilosophy;

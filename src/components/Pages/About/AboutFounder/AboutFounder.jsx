import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../../../hooks/useLanguage';

const AboutFounder = ({ founderImage, founder }) => {
  const image = getImage(founderImage.localFile)
  let overlayEl = React.useRef(null);
  let itemEl = React.useRef([]);
  itemEl.current = [];

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      overlayEl,
      { y: 0 },
      {
        y: '-100%',
        duration: 1.2,
        scrollTrigger: {
          trigger: overlayEl,
          start: 'center bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      }
    );

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
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !itemEl.current.includes(el)) {
      itemEl.current.push(el);
    }
  };

  return (
    <section className="founder">
      <div className="founder__wrapper">
        <div className="founder__container">
          <div className="founder__image-wrapper">
            <div className="animate-overlay" ref={(e) => (overlayEl = e)}></div>
            <GatsbyImage
            image={image}
            className="founder__image"
            alt={founder.title_ru}
          />
           
          </div>
          <div className="founder__content">
            <h2 className="founder__title" ref={addToRefs}>
              {useLanguage(
                founder.title_ua,
                founder.title_ru,
                founder.title_en
              )}
            </h2>
            <p className="founder__description" ref={addToRefs}>
              {useLanguage(
                founder.description_ua,
                founder.description_ru,
                founder.description_en
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

AboutFounder.propTypes = {
  image: PropTypes.object,
  founder: PropTypes.object,
};

export default AboutFounder;

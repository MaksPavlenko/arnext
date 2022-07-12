import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionHeader from '../SectionHeader/SectionHeader';
import ArrowLink from '../../../svg/arrowlinkblack.svg';

const Feedback = ({
  dataContacts,
  imageContact,
  markerCount,
  markerTitle,
  sectionTitle,
}) => {
  let overlayEl = React.useRef(null);
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
            start: 'top bottom',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
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
  }, []);

  const addToRefs = (el) => {
    if (el && !itemEl.current.includes(el)) {
      itemEl.current.push(el);
    }
  };
  const image = getImage(imageContact.localFile);
  return (
    <section className="feedback-section default-section">
      <div className="feedback-image__wrapper">
        <div className="animate-overlay" ref={(e) => (overlayEl = e)}></div>
        <GatsbyImage
          image={image}
          className="feedback__image"
          alt={markerTitle}
        />
      </div>
      <div className="feedback-section__content">
        <SectionHeader
          markerCount={markerCount}
          markerTitle={markerTitle}
          sectionTitle={sectionTitle}
        />
        <ul className="feedback-messanger">
          {dataContacts.messengers.map((item, index) => {
            return (
              <li
                className="feedback-messanger__item"
                key={index}
                ref={addToRefs}
              >
                <a
                  href={item.link}
                  className="feedback-messanger__item-link"
                  target="blank"
                >
                  <span className="messanger-item__link-title">
                    {item.messenger}
                  </span>
                  <ArrowLink className="messanger-item__link-icon" />
                </a>
              </li>
            );
          })}
          <li className="feedback-messanger__item" ref={addToRefs}>
            <a
              href={`mailto:${dataContacts.email}`}
              className="feedback-messanger__item-link"
            >
              <span className="messanger-item__link-title">E-mail</span>
              <ArrowLink className="messanger-item__link-icon" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

Feedback.propTypes = {
  dataContacts: PropTypes.object,
  image: PropTypes.object,
  markerCount: PropTypes.string,
  markerTitle: PropTypes.string,
  sectionTitle: PropTypes.string,
};

export default Feedback;

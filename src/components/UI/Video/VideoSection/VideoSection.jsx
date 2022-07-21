import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../../../hooks/useLanguage';

import PlayIcon from '../../../../svg/Polygon.svg';

const VideoSection = ({ openPopUp, cover }) => {
  const langToggle = useLanguage;
  const image = getImage(cover.localFile);
  let coverEl = React.useRef(null);
  let triggerEl = React.useRef(null);

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      coverEl,
      { scale: 1.5 },
      {
        scale: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top bottom',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      className="video-section default-section"
      ref={(e) => (triggerEl = e)}
    >
      <div className="video-cover__wrapper">
        <div className="video-cover" ref={(e) => (coverEl = e)}>
          <GatsbyImage
            image={image}
            className="video-cover__image"
            alt="video"
          />
        </div>
      </div>

      <button onClick={openPopUp} className="play-button">
        <span className="pulse"></span>
        <span className="play-button__icon">
          <span className="button-icon__text">
            {langToggle('Відео', 'Видео', 'Video')} <br />
            {langToggle('про нас', 'про нас', 'about us')}
          </span>
          <PlayIcon className="button-icon__polygon" />
        </span>
      </button>
    </section>
  );
};

VideoSection.propTypes = {
  openPopUp: PropTypes.func,
  cover: PropTypes.object,
};

export default VideoSection;

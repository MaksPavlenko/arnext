import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useMediaQuery } from 'react-responsive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../../../hooks/useLanguage';

import ButtonLink from '../../../UI/ButtonLink/ButtonLink';
import SectionHeader from '../../../UI/SectionHeader/SectionHeader';

const HomeStory = ({ dataStory, storyImage }) => {
  const data = useStaticQuery(graphql`
    query {
      portraitCover: file(relativePath: { eq: "about_portrait.jpeg" }) {
        childImageSharp {
          gatsbyImageData(
            breakpoints: [576, 768, 992, 1200, 1920]
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: FULL_WIDTH
          )
        }
      }
      landscapeCover: file(relativePath: { eq: "about_landscape.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            breakpoints: [576, 768, 992, 1200, 1920]
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            layout: FULL_WIDTH
          )
        }
      }
    }
  `);

  const isDesktop = useMediaQuery({ minWidth: 768 });
  // const image = getImage(storyImage.localFile);

  const image = getImage(
    isDesktop
      ? data.portraitCover.childImageSharp
      : data.landscapeCover.childImageSharp
  );

  const langToggle = useLanguage;

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
        duration: 1.5,
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

  return (
    <section className="home-story">
      <div className="story-item story-item--1">
        <div className="story-item--content">
          <SectionHeader
            markerCount={'01'}
            markerTitle={langToggle('Історія', 'История', 'Story')}
            sectionTitle={langToggle(
              dataStory.title_ua,
              dataStory.title_ru,
              dataStory.title_en
            )}
          />

          <p className="story-item--text" ref={addToRefs}>
            {langToggle(
              dataStory.text_ua,
              dataStory.text_ru,
              dataStory.text_en
            )}
          </p>
          <div className="btn-wrapper" ref={addToRefs}>
            <ButtonLink
              to={'/about/'}
              title={langToggle(
                'дізнатись більше',
                'Узнать больше',
                'Read more'
              )}
            />
          </div>
        </div>
      </div>

      <div className="story-item story-item--2">
        <div className="animate-overlay" ref={(e) => (overlayEl = e)}></div>
        <GatsbyImage
          image={image}
          className="story-item--image"
          alt={dataStory.title_ru}
        />
      </div>
    </section>
  );
};

export default HomeStory;

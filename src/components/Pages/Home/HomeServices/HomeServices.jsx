import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../../../hooks/useLanguage';
import PropTypes from 'prop-types';
import SectionHeader from '../../../UI/SectionHeader/SectionHeader';
import HomeServicesItems from './HomeServicesItems/HomeServicesItems';
import HomeServicesFooter from './HomeServicesFooter/HomeServicesFooter';

const HomeServices = ({ services, markerCount, markerTitle, sectionTitle }) => {
  let itemEl = React.useRef([]);
  itemEl.current = [];

  React.useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    itemEl.current.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
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
    <section className="home-services default-section">
      <div className="section-wrapper">
        <SectionHeader
          markerCount={markerCount}
          markerTitle={markerTitle}
          sectionTitle={sectionTitle}
        />
        <HomeServicesItems items={services.items} ref={addToRefs} />
        <HomeServicesFooter ref={addToRefs} />
      </div>
    </section>
  );
};

HomeServices.propTypes = {
  services: PropTypes.object,
  markerCount: PropTypes.string,
  markerTitle: PropTypes.string,
  sectionTitle: PropTypes.string,
};

export default HomeServices;

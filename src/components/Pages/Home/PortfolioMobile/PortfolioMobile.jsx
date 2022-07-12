import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useLanguage from '../../../../hooks/useLanguage';

import { DefaulSlideLink } from '../../../UI/DefaulSlide/ DefaulSlide';
import DefaultSlider from '../../../UI/DefaultSlider/DefaultSlider';
import { DefaultButtonLink } from '../../../UI/DefaultButtons/DefaultButtons';

import { fromPortfolioSlugToUrl } from '../../../../utils/slug';

import Arrow from '../../../../svg/arrow_link.svg';

// import { Link } from 'gatsby-plugin-react-i18next';
// import PropTypes from 'prop-types';

const PortfolioMobile = ({ sectionTitle, dataPortfolio }) => {
  const langToggle = useLanguage;

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
    <section className="mobile-portfolio home-cases cases-section">
      <header className="section-header section-header__mobile---portfolio">
        <h2 className="section-header__title" ref={addToRefs}>
          {sectionTitle}
        </h2>
      </header>

      <DefaultSlider ref={addToRefs}>
        {dataPortfolio.map((item, index) => {
          return (
            <DefaulSlideLink
              key={index}
              title={langToggle(
                item.project_name_ua,
                item.project_name_ru,
                item.project_name_en
              )}
              description={langToggle(
                item.sub_title_ua,
                item.sub_title_ru,
                item.sub_title_en
              )}
              number={item.project_number}
              img={item.main_image.localFile}
              link={fromPortfolioSlugToUrl(item.slug)}
            />
          );
        })}
      </DefaultSlider>
      <div className="section-wrapper">
        <div className="mobile-portfolio__button--wrapper" ref={addToRefs}>
          <DefaultButtonLink
            link={'/portfolio/'}
            title={langToggle(
              'Перейти в портфоліо',
              'Перейти в портфолио',
              'Go to portfolio'
            )}
          >
            <Arrow className="default-button__icon" />
          </DefaultButtonLink>
        </div>
      </div>
    </section>
  );
};

// PortfolioMobile.propTypes = {};

export default PortfolioMobile;

import React from 'react';
import { gsap } from 'gsap';
// import MediaQuery from 'react-responsive';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import useLanguage from '../../../../hooks/useLanguage';

import MainSlider from './MainSlider/MainSlider';
import HomeMainMobile from './HomeMainMobile/HomeMainMobile';

const HomeMain = ({ dataMain, dataSlider }) => {
  const langToggle = useLanguage;
  const breakpoints = useBreakpoint();

  let titleEl = React.useRef(null);

  React.useEffect(() => {
    gsap.fromTo(
      titleEl,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.3,
      }
    );
  }, []);

  return (
    <>
      <section className="main-screen_wrapper">
        <header className="main-screen_header">
          <h1 className="main-screen_title" ref={(e) => (titleEl = e)}>
            {langToggle(
              dataMain.title_ua,
              dataMain.title_ru,
              dataMain.title_en
            )}
          </h1>
        </header>
        {breakpoints.sm ? (
          <HomeMainMobile dataSlider={dataSlider} />
        ) : (
          <MainSlider dataSlider={dataSlider} />
        )}
        {/* <MediaQuery minWidth={768}>
          <MainSlider dataSlider={dataSlider} />
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <HomeMainMobile dataSlider={dataSlider} />
        </MediaQuery> */}
      </section>
    </>
  );
};

export default HomeMain;

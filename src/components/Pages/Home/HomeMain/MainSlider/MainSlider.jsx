import React from "react";
import { Link } from "gatsby-plugin-react-i18next";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { gsap } from "gsap";
import { scroller } from "react-scroll";
import useLanguage from "../../../../../hooks/useLanguage";

import ArrowLeft from "../../../../../svg/left.svg";
import ArrowRight from "../../../../../svg/right.svg";
import ArrowLink from "../../../../../svg/arrowlinkblack.svg";
import { fromPortfolioSlugToUrl } from "../../../../../utils/slug";

const MainSlider = ({ dataSlider }) => {
  const slides = dataSlider;

  const langToggle = useLanguage;

  function scrollDown() {
    scroller.scrollTo("home-story", {
      duration: 1500,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }

  let overlayEl = React.useRef(null);
  let sliderEl = React.useRef(null);
  let sliderNavEl = React.useRef(null);

  React.useEffect(() => {
    gsap.fromTo(
      overlayEl,
      { y: 0 },
      {
        y: "100%",
        duration: 0.7,
        delay: 0.3,
      }
    );
    gsap.fromTo(
      sliderEl,
      { y: 100 },
      {
        y: 0,
        duration: 0.7,
        delay: 0.3,
      }
    );
    gsap.fromTo(
      sliderNavEl,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay: 0.3,
      }
    );
  }, []);

  const fraction = 100 / slides.length;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [progress, setprogress] = React.useState(fraction);
  const [slideCounter, setSlideCounter] = React.useState(0);

  const totalCount = currentIndex + 1;

  function prevSlide() {
    setCurrentIndex(currentIndex - 1);
    setprogress(progress - fraction);
    setSlideCounter(slideCounter - fraction);
  }

  function nextSlide() {
    setCurrentIndex(currentIndex + 1);
    setprogress(progress + fraction);
    setSlideCounter(slideCounter + fraction);
  }

  return (
    <section className="about-test">
      <div className="test-slider--wrapper" ref={e => (sliderEl = e)}>
        <div className="slide-overlay" ref={e => (overlayEl = e)}></div>
        <div className="test-slider">
          {slides.map((slide, index) => {
            const slideClasses = {
              [currentIndex - 2]: "slider-slide--previous",
              [currentIndex - 1]: "slider-slide--left",
              [currentIndex]: "slider-slide--active",
              [currentIndex + 1]: "slider-slide--right",
              [currentIndex + 2]: "slider-slide--next",
            };

            if (index < currentIndex - 2 || index > currentIndex + 2) {
              return null;
            }
            const image = getImage(slide.main_image.localFile);
            return (
              <div
                className={`slider-slide ${slideClasses[index]}`}
                key={index}
              >
                <div className="slide-left">
                  <Link
                    to={fromPortfolioSlugToUrl(slide.slug)}
                    className="slide-link"
                  >
                    <GatsbyImage
                      image={image}
                      className="slider-image"
                      alt={slide.project_name_ru}
                    />
                  </Link>
                </div>
                <div className="slide-right">
                  <div className="slide-header">
                    <span className="slide-case">
                      {slide.project_number <= 10
                        ? "AR - 00" + slide.project_number
                        : "AR - 0" + slide.project_number}
                    </span>
                    <ul className="slide-info">
                      {slide.project_description.map((item, i) => {
                        if (item.marker) {
                          return (
                            <li key={i} className="slide-info--item">
                              <span className="info-item--title">
                                {langToggle(
                                  item.marker_ua,
                                  item.marker_ru,
                                  item.marker_en
                                )}
                              </span>
                              <span className="info-item--value">
                                {langToggle(
                                  item.value_ua,
                                  item.value_ru,
                                  item.value_en
                                )}
                              </span>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </div>
                  <div className="slide-footer">
                    <h2 className="h2">
                      {langToggle(
                        slide.project_name_ua,
                        slide.project_name_ru,
                        slide.project_name_en
                      )}
                    </h2>
                    <p className="slide-descr">
                      {langToggle(
                        slide.sub_title_ua,
                        slide.sub_title_ru,
                        slide.sub_title_en
                      )}
                    </p>
                    <Link
                      to={fromPortfolioSlugToUrl(slide.slug)}
                      className="slide-link"
                    >
                      <span className="slide-link--wrapper">
                        <span className="link-title">
                          {langToggle(
                            "Дивитись проект",
                            "Смотреть проект",
                            "Watch the project"
                          )}
                        </span>
                        <i className="link-icon">
                          <ArrowLink />
                        </i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="test-slider--navigation" ref={e => (sliderNavEl = e)}>
        <div className="test-slider--navigation__left">
          <div className="test-slider--buttons__wrapper">
            <button className="slider-scroll--down" onClick={scrollDown}>
              Scroll Down
            </button>
            <div className="test-slider--buttons">
              <button
                className="test-slider--button test-slider--button__prev"
                disabled={currentIndex === 0}
                onClick={prevSlide}
              >
                Prev
                <ArrowLeft />
              </button>
              <button
                className="test-slider--button test-slider--button__next"
                disabled={currentIndex === slides.length - 1}
                onClick={nextSlide}
              >
                Next
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="test-slider--navigation__right">
          <div className="counter-wrapper">
            <ul
              className="counter-list"
              style={{ transform: `translateY(-${slideCounter}%)` }}
            >
              {slides.map((numbers, index) => {
                const count = ++index;
                return (
                  <li className="counter-list__item" key={index}>
                    {"0" + count}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="current-count">{"0" + totalCount}</div>
          <div className="progress-wrapper">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="all-count">{"0" + slides.length}</div>
        </div>
      </div>
    </section>
  );
};

export default MainSlider;

import React from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import GalleryItem from "./GalleryItem/GalleryItem";

const PortfolioGalery = ({ galleryState }) => {

  let itemEl = React.useRef([]);
  itemEl.current = [];

  React.useEffect(() => {
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
          duration: 1.4,
          delay: 0.6,
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
    <section className="portfolio-gallery" ref={addToRefs}>
      <div className="section-wrapper">
        <div className="portfolio-items">
          {galleryState.reduce((result, item, index) => {
            if (index % 2) return result;

            const isReverse = Boolean(result.length % 2);

            result.push(
              <div key={index} className="portfolio-item">
                <div className={`img-wrapper ${isReverse && "reverse"}`}>
                  <GalleryItem item={item} />
                  <GalleryItem item={galleryState[index + 1]} />
                </div>
              </div>
            );

            return result;
          }, [])}
        </div>
      </div>
    </section>
  );
};

PortfolioGalery.propTypes = {
  galleryState: PropTypes.array,
};

export default PortfolioGalery;

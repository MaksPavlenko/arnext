import React from "react";
import PropTypes from "prop-types";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PortfolioMain from "./PortfolioMain/PortfolioMain";
import PortfolioGalery from "./PortfolioGalery/PortfolioGalery";

const Portfolio = ({ subTitle, title, gallery }) => {

  const [active, setActive] = React.useState(null);
  const [galleryState, setGalleryState] = React.useState(gallery);

  function toggleButton(index) {
    setActive(index);
    ScrollTrigger.refresh(true);
  }

  return (
    <div className="portfolio">
      <PortfolioMain
        toggleButton={toggleButton}
        active={active}
        gallery={gallery}
        setGalleryState={setGalleryState}
        subTitle={subTitle}
        title={title}
      />
      <PortfolioGalery galleryState={galleryState} />
    </div>
  );
};

Portfolio.propTypes = {
  subTitle: PropTypes.string,
  title: PropTypes.string,
  gallery: PropTypes.array,
};

export default Portfolio;

import React from 'react';
import PropTypes from 'prop-types';

import SectionHeader from '../../../UI/SectionHeader/SectionHeader';
import Accordion from './Accordion/Accordion';

const ServicesInnerAboutStyle = ({
  markerCount,
  markerTitle,
  sectionTitle,
  items,
}) => {
  return (
    <section className="service-inner__about">
      <div className="section-wrapper">
        <SectionHeader
          markerCount={markerCount}
          markerTitle={markerTitle}
          sectionTitle={sectionTitle}
        />
        <Accordion items={items} />
      </div>
    </section>
  );
};

ServicesInnerAboutStyle.propTypes = {
  markerCount: PropTypes.string,
  markerTitle: PropTypes.string,
  sectionTitle: PropTypes.string,
  items: PropTypes.array,
};

export default ServicesInnerAboutStyle;

import React from 'react';
import PropTypes from 'prop-types';
import useLanguage from '../../../hooks/useLanguage';
import FactsItems from './FactsItems/FactsItems';
import SectionHeader from '../SectionHeader/SectionHeader';

const Facts = ({ facts, markerCount, markerTitle, sectionTitle }) => {
  const langToggle = useLanguage;
  // const { title_ua, title_ru, title_en, marker_ua, marker_ru, marker_en,} = facts;

  return (
    <section className="facts default-section">
      <div className="section-wrapper">
        <SectionHeader
          markerCount={markerCount}
          markerTitle={markerTitle}
          sectionTitle={sectionTitle}
        />

        <FactsItems facts={facts} />
      </div>
    </section>
  );
};

Facts.propTypes = {
  facts: PropTypes.object,
  markerCount: PropTypes.string,
  markerTitle: PropTypes.string,
  sectionTitle: PropTypes.string,
};

export default Facts;

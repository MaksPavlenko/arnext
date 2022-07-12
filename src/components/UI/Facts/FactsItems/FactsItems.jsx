import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import useLanguage from '../../../../hooks/useLanguage';
import {
  FactItemBig,
  FactItemColumn,
  FactItemMiddle,
  FactItemSmall,
} from './FactItemSystem/FactItemSystem';

const FactsItems = ({ facts }) => {
  // console.log(facts);
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
    <div className="facts-items">
      <FactItemColumn>
        {facts.items.map((item, index) => {
          if (index === 0) {
            return (
              <FactItemSmall
                key={index}
                count={item.number}
                description={langToggle(
                  item.title_ua,
                  item.title_ru,
                  item.title_en
                )}
                ref={addToRefs}
              />
            );
          } else if (index === 1) {
            return (
              <FactItemMiddle
                key={index}
                count={item.number}
                description={langToggle(
                  item.title_ua,
                  item.title_ru,
                  item.title_en
                )}
                ref={addToRefs}
              />
            );
          } else {
            return null;
          }
        })}
      </FactItemColumn>
      <FactItemColumn>
        {facts.items.map((item, index) => {
          if (index === 2) {
            return (
              <FactItemBig
                key={index}
                count={item.number}
                description={langToggle(
                  item.title_ua,
                  item.title_ru,
                  item.title_en
                )}
                cover={item.cover}
                ref={addToRefs}
              />
            );
          } else {
            return null;
          }
        })}
      </FactItemColumn>

      <FactItemColumn>
        {facts.items.map((item, index) => {
          if (index === 3) {
            return (
              <FactItemMiddle
                key={index}
                count={item.number}
                description={langToggle(
                  item.title_ua,
                  item.title_ru,
                  item.title_en
                )}
                ref={addToRefs}
              />
            );
          } else if (index === 4) {
            return (
              <FactItemSmall
                key={index}
                count={item.number}
                description={langToggle(
                  item.title_ua,
                  item.title_ru,
                  item.title_en
                )}
                ref={addToRefs}
              />
            );
          } else {
            return null;
          }
        })}
      </FactItemColumn>
    </div>
  );
};

FactsItems.propTypes = {
  facts: PropTypes.object,
};

export default FactsItems;

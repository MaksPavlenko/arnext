import React from "react";
import PropTypes from "prop-types";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GatsbyImage, getImage } from "gatsby-plugin-image";

import { Link } from "gatsby-plugin-react-i18next";

import useLanguage from "../../../../hooks/useLanguage";
import {fromBlogSlugToUrl} from '../../../../utils/slug'

const BlogArticles = ({ articles }) => {

  const langToggle = useLanguage;

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
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
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
    <div className="blog__wrapper">
      <div className="blog__article">
        {articles.map((item, index) => {
          const image = getImage(item.image.localFile);
          if (index === 0) {
            return null;
          } else {
            return (
              <div className="animation-wrapper" ref={addToRefs} key={index}>
                <Link
                  to={fromBlogSlugToUrl(item.slug)}
                  key={item.id}
                  className="blog__article-item"
                >
                  <div className="blog__article-wrapper">
                    <div className="blog__article-cover">
                      <GatsbyImage
                        image={image}
                        className="blog__article-image"
                        alt={langToggle(
                          item.title_ua,
                          item.title_ru,
                          item.title_en
                        )}
                      />

                      <span className="blog__article-btn">
                        <span className="blog__article-pulse"></span>
                        <span className="top-button__icon">
                          <span className="top-button__icon-text">
                            {langToggle(
                              "Відкрити статтю",
                              "Открыть статью",
                              "Open article"
                            )}
                          </span>
                        </span>
                      </span>
                    </div>
                    <div className="blog__article-content">
                      <span className="blog__article-date">{item.date}</span>
                      <p className="blog__article-title">
                        {langToggle(
                          item.title_ua,
                          item.title_ru,
                          item.title_en
                        )}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

BlogArticles.propTypes = {
  articles: PropTypes.array,
};

export default BlogArticles;

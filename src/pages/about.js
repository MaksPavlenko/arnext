import React from "react";
import useLanguage from "../hooks/useLanguage";
import Layout from "../components/Layout/layout";
import Seo from "../components/Layout/seo";
import "../styles/style.sass";
import { graphql } from "gatsby";

import { aboutStatic } from "../db/aboutStatic";

import AboutMain from "../components/Pages/About/AboutMain/AboutMain";
import AboutFounder from "../components/Pages/About/AboutFounder/AboutFounder";
import AboutHistory from "../components/Pages/About/AboutHistory/AboutHistory";
import AboutPhilosophy from "../components/Pages/About/AboutPhilosophy/AboutPhilosophy";
import Video from "../components/UI/Video/Video";
import Quote from "../components/UI/Quote/Quote";
import CasesSlider from "../components/UI/CasesSlider/CasesSlider";
import CrumbsNav from "../components/UI/CrumbsNav/CrumbsNav";

const AboutPage = ({ data }) => {
  const dataAbout = data.strapiAbouts;

  return (
    <>
      <Layout>
        <Seo
          title={useLanguage(
            dataAbout.Seo_title_ua,
            dataAbout.Seo_title_ru,
            dataAbout.Seo_title_en
          )}
          description={useLanguage(
            dataAbout.Seo_description_ua,
            dataAbout.Seo_description_ru,
            dataAbout.Seo_description_en
          )}
        />
        <AboutMain
          subTitle={useLanguage("Про нас", "О нас", "About us")}
          title={useLanguage(
            dataAbout.title_ua,
            dataAbout.title_ru,
            dataAbout.title_en
          )}
          intro={dataAbout.intro}
          mainImage={dataAbout.image}
        />
        <AboutFounder
          founderImage={dataAbout.founder.image}
          founder={dataAbout.founder}
        />
        <AboutHistory
          markerCount={"03."}
          markerTitle={useLanguage("Історія", "История", "Story")}
          description={useLanguage(
            dataAbout.history_ua,
            dataAbout.history_ru,
            dataAbout.history_en
          )}
        />
        <Video cover={dataAbout.cover_image} url={dataAbout.video} />
        <div className="about-quotes__wrapper">
          <Quote quotes={dataAbout.quotes} />
        </div>
        <CasesSlider
          dataPortfolio={data.allStrapiPortfolio.nodes}
          markerCount={"03"}
          markerTitle={useLanguage("портфоліо", "Портфолио", "Portfolio")}
          sectionTitle={useLanguage(
            dataAbout.portfolio.title_ua,
            dataAbout.portfolio.title_ru,
            dataAbout.portfolio.title_en
          )}
        />
        <AboutPhilosophy
          markerCount={"04"}
          markerTitle={useLanguage("філософія", "Философия", "Philosophy")}
          sectionTitle={useLanguage(
            dataAbout.philosophy.title_ua,
            dataAbout.philosophy.title_ru,
            dataAbout.philosophy.title_en
          )}
          description={useLanguage(
            dataAbout.philosophy.description_ua,
            dataAbout.philosophy.description_ru,
            dataAbout.philosophy.description_en
          )}
        />
        <CrumbsNav crumbsNav={aboutStatic.crumbsNav} />
      </Layout>
    </>
  );
};

export default AboutPage;

export const aboutQuery = graphql`
  query AboutPage($language: String!) {
    strapiAbouts {
      Seo_title_ua
      Seo_title_ru
      Seo_title_en
      Seo_description_ua
      Seo_description_ru
      Seo_description_en
      title_ua
      title_ru
      title_en
      image {
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      intro {
        title_ua
        title_ru
        title_en
      }
      founder {
        title_ua
        title_ru
        title_en
        description_ua
        description_ru
        description_en
        image {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      history_ua
      history_ru
      history_en
      video
      cover_image {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      quotes {
        quote_ua
        quote_ru
        quote_en
        caption_ua
        caption_ru
        caption_en
      }
      portfolio {
        title_ua
        title_ru
        title_en
      }
      philosophy {
        title_ua
        title_ru
        title_en
        description_ua
        description_ru
        description_en
      }
    }
    allStrapiPortfolio(sort: { fields: id, order: DESC }) {
      nodes {
        project_name_ua
        project_name_ru
        project_name_en
        sub_title_ua
        sub_title_ru
        sub_title_en
        project_number
        slug
        main_image {
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
        project_description {
          marker
          marker_en
          marker_ru
          marker_ua
          value_en
          value_ru
          value_ua
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

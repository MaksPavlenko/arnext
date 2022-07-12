import React from 'react';
import { graphql } from 'gatsby';
import MediaQuery from 'react-responsive';
import useLanguage from '../hooks/useLanguage';
import '../styles/style.sass';

import Layout from '../components/Layout/layout';
import Seo from '../components/Layout/seo';
import HomeMain from '../components/Pages/Home/HomeMain/HomeMain';
import HomeStory from '../components/Pages/Home/HomeStory/HomeStory';
import Video from '../components/UI/Video/Video';
// import ServicePackages from '../components/UI/ServicePackages/ServicePackages';
import Feedback from '../components/UI/Feedback/Feedback';
import Quote from '../components/UI/Quote/Quote';
// import ServicesSection from '../components/UI/ServicesSection/ServicesSection';
import CasesSlider from '../components/UI/CasesSlider/CasesSlider';
import PortfolioMobile from '../components/Pages/Home/PortfolioMobile/PortfolioMobile';
import Facts from '../components/UI/Facts/Facts';
import HomeServices from '../components/Pages/Home/HomeServices/HomeServices';

// import servicesStatic from '../db/servicesStatic';
import homeData from '../db/homeData';

const IndexPage = ({ data }) => {
  // const staticServices = servicesStatic;

  const dataHomePage = data.strapiHomes;
  const dataHomecontacts = data.strapiContacts;

  return (
    <>
      <Layout>
        <Seo
          title={useLanguage(
            dataHomePage.Seo_title_ua,
            dataHomePage.Seo_title_ru,
            dataHomePage.Seo_title_en
          )}
          description={useLanguage(
            dataHomePage.Seo_description_ua,
            dataHomePage.Seo_description_ru,
            dataHomePage.Seo_description_en
          )}
        />
        <HomeMain
          dataMain={dataHomePage.main_title}
          dataSlider={data.allStrapiPortfolio.nodes}
        />
        <HomeStory
          storyImage={dataHomePage.story_image}
          dataStory={dataHomePage.story}
        />
        <MediaQuery minWidth={768}>
          <Video cover={dataHomePage.cover_image} url={dataHomePage.video} />
        </MediaQuery>
        <HomeServices
          services={homeData.services}
          markerCount={'02'}
          markerTitle={useLanguage(
            homeData.services.marker_ua,
            homeData.services.marker_ru,
            homeData.services.marker_en
          )}
          sectionTitle={useLanguage(
            homeData.services.title_ua,
            homeData.services.title_ru,
            homeData.services.title_en
          )}
        />
        <MediaQuery minWidth={768}>
          <CasesSlider
            dataPortfolio={data.allStrapiPortfolio.nodes}
            markerCount={'03'}
            markerTitle={useLanguage('портфоліо', 'Портфолио', 'Portfolio')}
            sectionTitle={useLanguage(
              dataHomePage.portfolio.title_ua,
              dataHomePage.portfolio.title_ru,
              dataHomePage.portfolio.title_en
            )}
          />
        </MediaQuery>
        <MediaQuery maxWidth={767}>
          <PortfolioMobile
            sectionTitle={useLanguage(
              dataHomePage.portfolio.title_ua,
              dataHomePage.portfolio.title_ru,
              dataHomePage.portfolio.title_en
            )}
            dataPortfolio={data.allStrapiPortfolio.nodes}
          />
        </MediaQuery>
        <Facts
          facts={homeData.facts}
          markerCount={'04'}
          markerTitle={useLanguage(
            homeData.facts.marker_ua,
            homeData.facts.marker_ru,
            homeData.facts.marker_en
          )}
          sectionTitle={useLanguage(
            homeData.facts.title_ua,
            homeData.facts.title_ru,
            homeData.facts.title_en
          )}
        />
        <MediaQuery minWidth={574}>
          <Quote quotes={dataHomePage.quotes} />
        </MediaQuery>

        {/* <ServicesSection
          markerCount={'02'}
          markerTitle={useLanguage('Послуги', 'Услуги', 'Services')}
          sectionTitle={useLanguage(
            dataHomePage.services.title_ua,
            dataHomePage.services.title_ru,
            dataHomePage.services.title_en
          )}
          staticServices={staticServices}
          dataServices={data.allStrapiServices.nodes}
        /> */}

        {/* <ServicePackages
          markerCount={'03'}
          markerTitle={useLanguage(
            'пакети послуг',
            'Пакеты услуг',
            'Service packages'
          )}
          sectionTitle={useLanguage(
            dataHomePage.packages.title_ua,
            dataHomePage.packages.title_ru,
            dataHomePage.packages.title_en
          )}
          dataServices={data.strapiServicesPages.packages}
        /> */}

        <Feedback
          markerCount={'05'}
          markerTitle={useLanguage(
            'залишити заявку',
            'Оставить заявку',
            'Submit your application'
          )}
          sectionTitle={useLanguage(
            dataHomecontacts.feedBack.title_ua,
            dataHomecontacts.feedBack.title_ru,
            dataHomecontacts.feedBack.title_en
          )}
          dataContacts={dataHomecontacts}
          imageContact={dataHomecontacts.feedBack.image}
        />
      </Layout>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query MainHome($language: String!) {
    strapiHomes {
      Seo_title_ua
      Seo_title_ru
      Seo_title_en
      Seo_description_ua
      Seo_description_ru
      Seo_description_en
      main_title {
        title_ua
        title_ru
        title_en
      }
      story {
        title_ua
        title_ru
        title_en
        text_ua
        text_ru
        text_en
      }
      story_image {
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
      video
      cover_image {
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
      services {
        title_ua
        title_ru
        title_en
      }
      packages {
        title_ua
        title_ru
        title_en
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
      # portfolios {
      #   project_name_ua
      #   project_name_ru
      #   project_name_en
      #   project_number
      #   sub_title_ua
      #   sub_title_ru
      #   sub_title_en
      #   slug
      #   main_image {
      #     localFile {
      #       childImageSharp {
      #         gatsbyImageData(
      #           width: 1400
      #           placeholder: BLURRED
      #           formats: [AUTO, WEBP, AVIF]
      #         )
      #       }
      #     }
      #   }
      #   project_description {
      #     marker
      #     marker_en
      #     marker_ru
      #     marker_ua
      #     value_en
      #     value_ru
      #     value_ua
      #   }
      # }
    }
    allStrapiServices {
      nodes {
        id
        title_ua
        title_ru
        title_en
        slug
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
        services_category {
          marker
        }
      }
    }
    strapiServicesPages {
      packages {
        title_ua
        title_ru
        title_en
        list {
          title_ua
          title_ru
          title_en
        }
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
    strapiContacts {
      messengers {
        messenger
        link
      }
      email
      feedBack {
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

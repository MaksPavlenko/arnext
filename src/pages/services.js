import React from "react";
import useLanguage from "../hooks/useLanguage";
import { graphql } from "gatsby";

import Layout from "../components/Layout/layout";
import Seo from "../components/Layout/seo";
import "../styles/style.sass";
import {
  ServicesMain,
  ServicesCategory,
  ServicesSection,
  ServicePackages,
  Feedback,
  ServicesApproach,
  CrumbsNav,
} from "../components/Pages/Services";

import servicesStatic from "../db/servicesStatic";

const ServicesPage = ({ data }) => {
  const dataServices = data.strapiServicesPages;

  return (
    <>
      <Layout>
        <Seo
          title={useLanguage(
            dataServices.Seo_title_ua,
            dataServices.Seo_title_ru,
            dataServices.Seo_title_en
          )}
          description={useLanguage(
            dataServices.Seo_description_ua,
            dataServices.Seo_description_ru,
            dataServices.Seo_description_en
          )}
        />
        <ServicesMain
          subTitle={useLanguage("Послуги", "Услуги", "Services")}
          title={useLanguage(
            dataServices.title_ua,
            dataServices.title_ru,
            dataServices.title_en
          )}
          intro={useLanguage(
            dataServices.description_ua,
            dataServices.description_ru,
            dataServices.description_en
          )}
          mainImage={data.strapiServicesPages}
        />
        <ServicesCategory
          markerCount={"02"}
          markerTitle={useLanguage(
            "що ми робимо",
            "Что мы делаем",
            "What are we doing"
          )}
          sectionTitle={useLanguage(
            dataServices.category.title_ua,
            dataServices.category.title_ru,
            dataServices.category.title_en
          )}
          category={dataServices.category.category_list}
        />
        <ServicesSection
          markerCount={"03"}
          markerTitle={useLanguage("Послуги", "Услуги", "Services")}
          sectionTitle={useLanguage(
            dataServices.services_title_ua,
            dataServices.services_title_ru,
            dataServices.services_title_en
          )}
          staticServices={servicesStatic}
          dataServices={data.allStrapiServices.nodes}
        />
        <ServicePackages
          markerCount={"04"}
          markerTitle={useLanguage(
            "пакети послуг",
            "Пакеты услуг",
            "Service packages"
          )}
          sectionTitle={useLanguage(
            dataServices.service_packeges.title_ua,
            dataServices.service_packeges.title_ru,
            dataServices.service_packeges.title_en
          )}
          dataServices={dataServices.packages}
        />

        <ServicesApproach
          markerCount={"05"}
          markerTitle={useLanguage(
            "Наші особливості",
            "Наши особенности",
            "Our features"
          )}
          sectionTitle={useLanguage(
            dataServices.approach.title_ua,
            dataServices.approach.title_ru,
            dataServices.approach.title_en
          )}
          items={dataServices.approach.approach_items}
        />

        <Feedback
          markerCount={"06"}
          markerTitle={useLanguage(
            "залишити заявку",
            "Оставить заявку",
            "Submit your application"
          )}
          sectionTitle={useLanguage(
            data.strapiContacts.feedBack.title_ua,
            data.strapiContacts.feedBack.title_ru,
            data.strapiContacts.feedBack.title_en
          )}
          dataContacts={data.strapiContacts}
          imageContact={data.strapiContacts.feedBack.image}
        />
        <CrumbsNav crumbsNav={servicesStatic.crumbsNav} />
      </Layout>
    </>
  );
};

export default ServicesPage;

export const query = graphql`
  query ServicesPage($language: String!) {
    strapiServicesPages {
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
      services_title_ua
      services_title_ru
      services_title_en
      description_ua
      description_ru
      description_en
      category {
        title_ua
        title_ru
        title_en
        category_list {
          title_ua
          title_ru
          title_en
          description_ua
          description_ru
          description_en
        }
      }
      category_title {
        title_ua
        title_ru
        title_en
      }
      service_packeges {
        title_ua
        title_ru
        title_en
      }
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
      approach {
        title_ua
        title_ru
        title_en
        approach_items {
          title_ua
          title_ru
          title_en
          description_ua
          description_ru
          description_en
          icon {
            url
          }
        }
      }
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

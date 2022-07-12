import React from 'react';
import { graphql } from 'gatsby';
import useLanguage from '../hooks/useLanguage';
import Layout from '../components/Layout/layout';
import Seo from '../components/Layout/seo';
import '../styles/style.sass';

import {
  ServicesInnerMain,
  ServicesInnerAboutStyle,
  Video,
  ServicePackages,
  ServicesInnerProjects,
  Feedback,
  CrumbsNav,
} from '../components/Pages/ServicesInner';

// import servicesInnerData from "../db/servicesInnerData";
// import servicesData from "../db/servicesData";
// import contactsData from "../db/contactsData";
import servicesInnerStatic from '../db/servicesInnerStatic';

const ServicesInnerPage = ({ data }) => {
  const dataServices = data.strapiServices;

  const langToggle = useLanguage;

  return (
    <>
      <Layout>
        {/* <Seo
          title={useLanguage(
            dataServices.seo_title_ua,
            dataServices.seo_title_ru,
            dataServices.seo_title_en
          )}
          description={useLanguage(
            dataServices.seo_description_ua,
            dataServices.seo_description_ru,
            dataServices.seo_description_en
          )}
        />
        <ServicesInnerMain
          subTitle={useLanguage("Послуга", "Услуга", "Service")}
          title={useLanguage(
            dataServices.title_ua,
            dataServices.title_ru,
            dataServices.title_en
          )}
          carousel={dataServices.Gallery}
        />
        <ServicesInnerAboutStyle
          markerCount={"02"}
          markerTitle={useLanguage("Про стиль", "О стиле", "About style")}
          sectionTitle={useLanguage(
            dataServices.about_style.title_ua,
            dataServices.about_style.title_ru,
            dataServices.about_style.title_en
          )}
          items={dataServices.about_style.accordion}
        />
        {dataServices.video ? (
          <Video cover={dataServices.cover_image} url={dataServices.video} />
        ) : null}
        <ServicePackages
          markerCount={"03"}
          markerTitle={useLanguage(
            "пакети послуг",
            "Пакеты услуг",
            "Service packages"
          )}
          sectionTitle={useLanguage(
            dataServices.packages.title_ua,
            dataServices.packages.title_ru,
            dataServices.packages.title_en
          )}
          dataServices={data.strapiServicesPages.packages}
        />
        {dataServices.portfolios.length === 0 ? null : (
          <ServicesInnerProjects
            markerCount={"04"}
            markerTitle={langToggle(
              "Каталог проектів",
              "Каталог проектов",
              "Project catalog"
            )}
            sectionTitle={langToggle(
              dataServices.projects.title_ua,
              dataServices.projects.title_ru,
              dataServices.projects.title_en
            )}
            dataCatalog={dataServices.portfolios}
          />
        )}

        <Feedback
          markerCount={"05"}
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
        <CrumbsNav
          crumbsNav={servicesInnerStatic.crumbsNav}
          slug={"/services/" + dataServices.slug + "/"}
          title={useLanguage(
            dataServices.title_ua,
            dataServices.title_ru,
            dataServices.title_en
          )}
        /> */}
      </Layout>
    </>
  );
};

export default ServicesInnerPage;

export const query = graphql`
  query ServicesInner($language: String!, $id: String!) {
    strapiServices(id: { eq: $id }) {
      seo_title_ua
      seo_title_ru
      seo_title_en
      seo_description_ua
      seo_description_ru
      seo_description_en
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
      Gallery {
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
      about_style {
        title_ua
        title_ru
        title_en
        accordion {
          id
          title_ua
          title_ru
          title_en
          content_ua
          content_ru
          content_en
        }
      }
      packages {
        title_ua
        title_ru
        title_en
      }
      projects {
        title_ua
        title_ru
        title_en
      }
      portfolios {
        id
        project_name_ua
        project_name_ru
        project_name_en
        project_number
        slug
        sub_title_ua
        sub_title_ru
        sub_title_en
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

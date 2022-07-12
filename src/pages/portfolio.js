import React from 'react';
import useLanguage from '../hooks/useLanguage';
import Layout from '../components/Layout/layout';
import { graphql } from 'gatsby';
import Seo from '../components/Layout/seo';
import '../styles/style.sass';
import { Portfolio, CrumbsNav } from '../components/Pages/Portfolio';
import { portfolioStatic } from '../db/portfolioStatic';

const PortfolioPage = ({ data }) => {
  const langToggle = useLanguage;

  return (
    <>
      <Layout>
        <Seo title={langToggle('Портфоліо', 'Портфолио', 'Portfolio')} />
        {/* <Portfolio
          subTitle={useLanguage("Портфоліо", "Портфолио", "Portfolio")}
          title={useLanguage(
            "Поєднання різних \nнапрямків та матеріалів",
            "Сочетание различных \nнапрямкив и материалов",
            "A combination of different \ndirections and materials"
          )}
          gallery={data.allStrapiPortfolio.nodes}
        />
        <CrumbsNav crumbsNav={portfolioStatic.crumbsNav} /> */}
      </Layout>
    </>
  );
};

export default PortfolioPage;

export const query = graphql`
  query PortfolioPage($language: String!) {
    # allStrapiPortfolio(sort: { fields: id, order: DESC }) {
    #   nodes {
    #     project_name_ua
    #     project_name_ru
    #     project_name_en
    #     sub_title_ua
    #     sub_title_ru
    #     sub_title_en
    #     project_number
    #     award
    #     slug
    #     project_filter {
    #       title
    #     }
    #     main_image {
    #       localFile {
    #         childImageSharp {
    #           gatsbyImageData(
    #             layout: FULL_WIDTH
    #             placeholder: BLURRED
    #             formats: [AUTO, WEBP, AVIF]
    #           )
    #         }
    #       }
    #     }
    #   }
    # }
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

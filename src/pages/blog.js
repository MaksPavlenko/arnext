import React from 'react';
import { graphql } from 'gatsby';

import useLanguage from '../hooks/useLanguage';
import Layout from '../components/Layout/layout';
import Seo from '../components/Layout/seo';
import '../styles/style.sass';

import { blogStatic } from '../db/blogStatic';

import BlogTopArticle from '../components/Pages/Blog/BlogTopArticle/BlogTopArticle';

import BlogArticles from '../components/Pages/Blog/BlogArticles/BlogArticles';
import CrumbsNav from '../components/UI/CrumbsNav/CrumbsNav';

const BlogPage = ({ data }) => {
  // const blogData = data.allStrapiBlogs.nodes;
  const langToggle = useLanguage;

  return (
    <>
      <Layout>
        <Seo title={langToggle('Блог', 'Блог', 'Blog')} />
        {/* <BlogTopArticle
          topArticle={blogData}
          subTitle={langToggle("Блог", "Блог", "Blog")}
          title={langToggle(
            blogStatic.blogHeader.title_ua,
            blogStatic.blogHeader.title_ru,
            blogStatic.blogHeader.title_en
          )}
        />
        <BlogArticles articles={blogData} />
        <CrumbsNav crumbsNav={blogStatic.crumbsNav} /> */}
      </Layout>
    </>
  );
};

export default BlogPage;

export const query = graphql`
  query Blog($language: String!) {
    # allStrapiBlogs(sort: { fields: date, order: DESC }) {
    #   nodes {
    #     id
    #     date
    #     title_ua
    #     title_ru
    #     title_en
    #     slug
    #     intro_ua
    #     intro_ru
    #     intro_en
    #     image {
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

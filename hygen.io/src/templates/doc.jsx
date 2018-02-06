import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Link from 'gatsby-link'

import SEO from '../components/seo'
import SiteHeader from '../components/header'
import config from '../../site-config'
import TableOfContents from '../components/toc'
import logo from '../assets/hygen.svg'

export default class DocTemplate extends React.Component {
  render() {
    const { slug } = this.props.pathContext
    const postNode = this.props.data.postBySlug
    const post = postNode.frontmatter
    if (!post.id) {
      post.id = slug
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID
    }
    return (
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <BodyGrid>
          <HeaderContainer>
            <LogoBar>
              <LogoHeader>
                <Link to="/">
                  <img src={logo} width="32px" />
                  <span>hygen</span>
                </Link>
              </LogoHeader>
              <SiteHeaderWrapper>
                <SiteHeader location={this.props.location} />
              </SiteHeaderWrapper>
            </LogoBar>
          </HeaderContainer>
          <ToCContainer>
            <TableOfContents
              location={this.props.location}
              posts={this.props.data.allPostTitles.edges}
              contentsType="doc"
              sectionTitles={config.toCSections}
            />
          </ToCContainer>
          <BodyContainer>
            <div>
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </div>
          </BodyContainer>
        </BodyGrid>
      </div>
    )
  }
}

const BodyGrid = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: 250px 1fr;
  height: 100vh;
  min-height: 100vh;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    height: inherit;
  }
`

const BodyContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  overflow: scroll;
  justify-self: center;
  width: 100%;
  padding: ${props => props.theme.sitePadding};
  @media screen and (max-width: 600px) {
    order: 2;
  }

  & > div {
    max-width: ${props => props.theme.contentWidthLaptop};
    margin: auto;
  }

  & > h1 {
    color: ${props => props.theme.accentDark};
  }
`

const HeaderContainer = styled.div`
  border-bottom: 1px solid #f0f0f0;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  z-index: 2;
  @media screen and (max-width: 600px) {
    order: 1;
  }
`

const ToCContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  background: ${props => props.theme.lightGrey};
  border-right: 1px solid #f0f0f0;
  overflow: scroll;
  @media screen and (max-width: 600px) {
    order: 3;
    overflow: inherit;
  }
`

const LogoBar = styled.div`
  display: flex;
  flex-direction: row;
`
const LogoHeader = styled.div`
  flex: 0.4;
  padding: 20px;
  font-size: 1.8em;
  img {
    margin-bottom: -8px;
    margin-right: 5px;
  }
  span {
    font-weight: 200;
    color: #f722b1;
  }
`
const SiteHeaderWrapper = styled.div`
  flex: 0.5;
`

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query DocBySlug($slug: String!) {
    allPostTitles: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            doc
            section
            type
          }
          fields {
            slug
          }
        }
      }
    }
    postBySlug: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`

import React from 'react'
import styled from 'styled-components'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import '../css/prism.css'
import '../css/docsearch.min.css'
import '../css/docsearch.custom.css'
import CtaButton from '../components/cta-button'
import Shell from '../components/shell'

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  const gitHubURL = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <IndexHeadContainer>
        <Hero>
          <img
            src={useBaseUrl('img/hygen.svg')}
            width="150px"
            alt={`${siteConfig.title} logo.`}
          />
          <h1 style={{ fontSize: '2rem', fontWeight: 'lighter' }}>
            {siteConfig.title}
          </h1>
          <Subtitle>The scalable code generator that saves you time.</Subtitle>
          <Shell style={{ margin: '5.5rem 0 2rem 0' }} />
          <CtaButton to="quick-start">Quick Start</CtaButton>
          <Or>&mdash; or &mdash;</Or>
          <TtaLink href={gitHubURL}>Github &rarr;</TtaLink>
        </Hero>
      </IndexHeadContainer>
      <main>
        <BodyContainer>
          {siteConfig.customFields.features &&
            siteConfig.customFields.features.length && (
              <Section>
                <Triplet>
                  {siteConfig.customFields.features.map(
                    ({ image, title, content }) => (
                      <Feature key={title}>
                        <img
                          src={useBaseUrl(`img/${image}`)}
                          width="100px"
                          alt={title}
                        />
                        <Subtitle>{title}</Subtitle>
                        <Description>{content}</Description>
                      </Feature>
                    ),
                  )}
                </Triplet>
              </Section>
            )}
          <Section>
            {siteConfig.customFields.stories.map(
              ({ link, tagline, avatar, title }) => (
                <div
                  key={title}
                  style={{
                    maxWidth: 700,
                    textAlign: 'left',
                    padding: '10px',
                    margin: '4rem auto',
                  }}
                >
                  <TtaLink href={link}>
                    <img
                      src={avatar}
                      style={{
                        float: 'left',
                        borderRadius: 32,
                        width: 64,
                        height: 64,
                        marginRight: 10,
                      }}
                      alt={`Author for story ${title}.`}
                    />
                    <div style={{}}>
                      {title} &rarr;
                      <ArticleTagline>{tagline}</ArticleTagline>
                    </div>
                  </TtaLink>
                </div>
              ),
            )}
          </Section>
          <Section>
            <h1>See how to use with:</h1>
            <Triplet>
              {siteConfig.customFields.usedIn.map(
                ({ width, image, title, link }) => (
                  <Feature key={title}>
                    <Link to={useBaseUrl(`docs/${link}`)}>
                      <Subtitle>{title}</Subtitle>
                      <img
                        src={useBaseUrl(`img/${image}`)}
                        width={width}
                        alt={`${title} logo.`}
                      />
                    </Link>
                  </Feature>
                ),
              )}
            </Triplet>
          </Section>
        </BodyContainer>
      </main>
    </Layout>
  )
}

export default Home

const Section = styled.section`
  border-bottom: 1px solid #f0f0f0;
  padding: 2.666666667rem 0;
  padding-bottom: 4rem;
  text-align: center;
`

const TtaLink = styled.a`
  color: var(--ifm-color-primary);
  font-size: 1.2rem;
`

const ArticleTagline = styled.div`
  color: var(--brand-secondary);
  font-weight: 300;
  font-style: italic;
`

const Or = styled.div`
  margin: 0 1.333333333rem;
  color: var(--brand-secondary);
  display: inline-block;
  font-family: Georgia, serif;
  font-size: 1.2rem;
  font-style: italic;
`

const Hero = styled.div`
  padding: 50px 0;
  & > h1 {
    font-weight: 300;
    font-size: 3.2rem;
    color: var(--ifm-color-primary);
    margin: 0;
  }
`
const Subtitle = styled.h2`
  color: var(--brand-secondary);
  font-weight: lighter;
  margin: 1.2rem 0;
`

const Description = styled.p`
  color: var(--ink);
  /* font-size: 1.125rem; */
  font-size: 1.05rem;
  margin: 2rem 0;
`

const BodyContainer = styled.div``

const Triplet = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 1100px;
  h2 {
  }
  @media screen and (max-width: 600px) {
    display: block;
  }
`

const Feature = styled.div`
  flex: 0.333333;
  text-align: center;
  padding: 1rem;
`
const IndexHeadContainer = styled.div`
  background: white;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
`

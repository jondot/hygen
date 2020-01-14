import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

const features = [
  {
    title: <>Simplicity is Key</>,
    imageUrl: 'img/simple.svg',
    description: (
      <>
        Generators are self-contained and folder structure makes up the command
        structure. Complex is easy but simple is hard.
      </>
    ),
  },
  {
    title: <>Scales with any team</>,
    imageUrl: 'img/scalable.svg',
    description: (
      <>
        Contextual template lookup, pull requests that look nice and clean,
        structured file organization, make generators fun again!
      </>
    ),
  },
  {
    title: <>Fast is a Feature</>,
    imageUrl: 'img/fast.svg',
    description: (
      <>
        Constantly benchmarked and dependencies are carefully considered to
        shorten startup and generation time.
      </>
    ),
  },
]

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  console.log(useBaseUrl('img/fast.svg'), 'joe')
  console.log('damn you', siteConfig.customFields.usedIn)
  return (
    <Layout
      title={siteConfig.title}
      description="Description will go into a meta tag in <head />"
    >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/quick-start')}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        <BodyContainer>
          {features && features.length && (
            <Section>
              <Triplet>
                {features.map(({ imageUrl, title, description }, idx) => (
                  <Feature key={idx}>
                    <img src={useBaseUrl(imageUrl)} width="100px" alt={title} />
                    <Subtitle>{title}</Subtitle>
                    <p>{description}</p>
                  </Feature>
                ))}
              </Triplet>
            </Section>
          )}
          <Section>
            {siteConfig.customFields.stories.map(
              ({ link, tagline, avatar, title }) => (
                <div
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
                  <Feature>
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
  padding: 4rem 0;
  padding-bottom: 6rem;
  text-align: center;
`

const TtaLink = styled.a`
  color: var(--ifm-color-primary);
`

const ArticleTagline = styled.div`
  color: var(--brand-secondary);
  font-weight: 300;
  font-style: italic;
`

const Or = styled.div`
  margin: 0 2rem;
  color: ${({ theme: { brandSecondary } }) => brandSecondary};
  display: inline-block;
  font-family: Georgia, serif;
  font-size: 1.8em;
  font-style: italic;
`

const Hero = styled.div`
  padding: 50px 0;
  & > h1 {
    font-weight: 300;
    font-size: 3.2rem;
    color: #f722b1;
    margin: 0;
  }
`

const Container = styled.div`
  flex: 0.333333;
  text-align: center;
  padding: 1rem;
`
const Subtitle = styled.h2`
  color: var(--brand-secondary);
  font-weight: lighter;
  margin: 2rem 0;
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

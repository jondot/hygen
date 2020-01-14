import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'
import Feature from '../components/feature'

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
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
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

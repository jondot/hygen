import React from 'react'
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
      </main>
    </Layout>
  )
}

export default Home

import React from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import config, { theme } from '../../site-config'
import '../css/index.scss'
import '../css/prism.css'
import '../css/docsearch.min.css'
import '../css/docsearch.custom.css'

export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Helmet>
          <title>{config.siteTitle}</title>
          <meta name="description" content={config.siteDescription} />
        </Helmet>
        <ThemeProvider theme={theme}>{children()}</ThemeProvider>
      </div>
    )
  }
}

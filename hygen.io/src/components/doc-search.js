import React, { Component } from 'react'
import styled from 'styled-components'
import siteConfig from '../../docusaurus.config'
import searchIcon from '../../static/img/search.svg'

class DocSearch extends Component {
  state = {
    enabled: true,
  }

  componentDidMount() {
    // Initialize Algolia search.
    // TODO Is this expensive? Should it be deferred until a user is about to search?
    // eslint-disable-next-line no-undef
    if (window.docsearch) {
      window.docsearch(siteConfig.docSearch)
    } else {
      console.warn('Search has failed to load and now is being disabled')
      this.setState({ enabled: false })
    }
  }

  render() {
    const { enabled } = this.state

    return enabled ? (
      <form
        style={{
          display: 'flex',
          flex: '0 0 auto',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
        }}
      >
        <SearchInput
          style={{}}
          id="algolia-doc-search"
          type="search"
          placeholder="Search docs"
          aria-label="Search docs"
        />
      </form>
    ) : null
  }
}

const SearchInput = styled.input`
  margin: 0 1.6rem;
  appearance: none;
  background: #f0f0f0;
  border: 0;
  color: ${({ theme: { ink } }) => ink};
  font-size: 1.6rem;
  font-family: inherit;
  position: relative;
  padding: 5px 5px 5px 29px;
  background-image: url(${searchIcon});
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 5px;
  border-radius: 0.8rem;
  width: 14rem;

  &:focus {
    outline: 0;
    backgroundcolor: #f0f0f0;
    border-radius: 0.8rem;
  }
`
export default DocSearch

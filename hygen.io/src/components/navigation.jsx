import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import DocSearch from './doc-search'

class Navigation extends React.Component {
  render() {
    return (
      <NavContainer>
        <section>
          <Link className="nav-link" to="/">
            {' '}
            Home{' '}
          </Link>
          <Link className="nav-link" to="/quick-start">
            {' '}
            Docs{' '}
          </Link>
          <a className="nav-link" href="https://github.com/jondot/hygen">
            Github
          </a>
          {this.props.withSearch && <DocSearch />}
        </section>
      </NavContainer>
    )
  }
}

const NavContainer = styled.div`
  display: flex;
  width: 100%;

  justify-content: flex-end;
  .nav-link {
    font-size: 1.6rem;
    margin-right: 10px;
    color: ${props => props.theme.ink};
  }
  section {
    right: 5rem;
    display: flex;
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    section {
      position: relative;
      right: 0;
      margin: 0 auto;
    }
  }
`

export default Navigation

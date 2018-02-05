import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

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
        </section>
      </NavContainer>
    )
  }
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  .nav-link {
    font-size: 1.6rem;
    margin-right: 10px;
    color: ${props => props.theme.ink};
  }
  section {
    position: absolute;
    right: 5rem;
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

    span {
      display: none;
    }
  }
`

export default Navigation

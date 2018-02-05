import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

class ctaButton extends Component {
  render() {
    const { children } = this.props
    return (
      <Link style={{ border: 'none' }} to={this.props.to}>
        <ButtonContainer>{children}</ButtonContainer>
      </Link>
    )
  }
}

export default ctaButton

const ButtonContainer = styled.div`
  border: 1px solid ${props => props.theme.brand};
  border-radius: 30px;
  padding: 8px 20px;
  margin: 1rem 0;
  font-size: 2rem;
  background-color: ${props => props.theme.brand};
  color: white;
  display: inline-block;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: ${props => props.theme.brand};
  }
`

import React from 'react'
import Link from '@docusaurus/Link'
import styled from 'styled-components'

const CtaButton = ({ children, to }) => (
  <Link style={{ border: 'none' }} to={to}>
    <ButtonContainer>{children}</ButtonContainer>
  </Link>
)

export default CtaButton

const ButtonContainer = styled.div`
  box-shadow: rgba(100, 0, 100, 0.12) 0px 5px 10px 0px;
  border: 1px solid var(--ifm-color-primary);
  border-radius: 5px;
  padding: 15px 30px;
  margin: 1rem 0;
  font-size: 1.1em;
  background-color: var(--ifm-color-primary);
  color: white;
  display: inline-block;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: rgba(100, 0, 100, 0.12) 0px 8px 30px 0px;
  }
`

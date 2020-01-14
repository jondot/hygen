import React, { Component } from 'react'
import Link from '@docusaurus/Link'
import styled from 'styled-components'

const CtaButton = ({ children, to }) => (
  <Link style={{ border: 'none' }} to={to}>
    <ButtonContainer>{children}</ButtonContainer>
  </Link>
)

export default CtaButton

const ButtonContainer = styled.div`
  border: 1px solid var(--ifm-color-primary);
  border-radius: 30px;
  padding: 8px 20px;
  margin: 1rem 0;
  font-size: 1.333333333rem;
  background-color: var(--ifm-color-primary);
  color: white;
  display: inline-block;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: var(--ifm-color-primary);
  }
`

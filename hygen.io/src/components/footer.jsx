import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'

class Footer extends React.Component {
  render() {
    return (
      <Container>
        <Hero>Hygen</Hero>
        <Links>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/quick-start">Docs</FooterLink>
          <FooterHref href="https://github.com/jondot/hygen">Github</FooterHref>
        </Links>
      </Container>
    )
  }
}

const Container = styled.section`
  background: ${({ theme: { ink } }) => ink};
  padding: 3rem 0;
  display: flex;
  color: ${({ theme: { white } }) => white};
  font-size: 1.8rem;
`
const Hero = styled.div`
  flex: 0.5;
  text-align: right;
  padding: 1rem;
  font-weight: 300;
`
const Links = styled.div`
  flex: 0.5;
  text-align: left;
  padding: 1rem;
  border-left: ${({ theme: { white } }) => `1px solid ${white}`};
`
const FooterLink = styled(Link)`
  &,
  &:hover {
    color: ${({ theme: { white } }) => white};
    display: block;
    text-decoration: none;
    border-bottom: none;
  }
`
const FooterHref = styled.a`
  &,
  &:hover {
    color: ${({ theme: { white } }) => white};
    display: block;
    text-decoration: none;
    border-bottom: none;
  }
`
export default Footer

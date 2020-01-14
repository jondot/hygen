import React from 'react'
import styled from 'styled-components'
import useBaseUrl from '@docusaurus/useBaseUrl'

const Feature = ({ imageUrl, title, description }) => {
  const imgUrl = useBaseUrl(imageUrl)
  return (
    <Container>
      <img src={imgUrl} width="100px" alt={`${title}.`} />
      <Subtitle>{title}</Subtitle>
      <Description>{description}</Description>
    </Container>
  )
}

export default Feature

const Container = styled.div`
  flex: 0.333333;
  text-align: center;
  padding: 1rem;
`
const Subtitle = styled.h2`
  color: var(--brand-secondary);
  font-weight: lighter;
  margin: 2rem 0;
`

const Description = styled.p`
  color: var(--ink);
  /* font-size: 1.125rem; */
  font-size: 1.05rem;
  margin: 2rem 0;
`

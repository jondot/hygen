import React from 'react'
import styled from 'styled-components'
import Navigation from './navigation'

class MainHeader extends React.Component {
  render() {
    return (
      <SiteContainer>
        <Navigation />
      </SiteContainer>
    )
  }
}

const SiteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

export default MainHeader

import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

class TableOfContents extends React.Component {
  buildNodes() {
    const { posts } = this.props
    const type = this.props.contentsType
    const postNodes = []
    posts.forEach(post => {
      if (post.node.frontmatter.type === type) {
        const postNode = {
          title: post.node.frontmatter.title,
          path: post.node.fields.slug,
          docNumber: post.node.frontmatter.doc,
          section: post.node.frontmatter.section
        }
        postNodes.push(postNode)
      }
    })

    const postNodeSections = []
    postNodes.forEach(post => {
      if (postNodeSections[post.section]) {
        postNodeSections[post.section].push(post)
      } else {
        postNodeSections[post.section] = [post]
      }
    })

    postNodeSections.forEach(section => {
      section.sort((a, b) => a.docNumber > b.docNumber)
    })
    return postNodeSections
  }

  nodeListItems() {
    const postNodeSections = this.buildNodes()
    const listItems = []
    const sectionTitles = this.props.sectionTitles
    postNodeSections.forEach((section, idx) => {
      const sectionDocs = []
      section.forEach(node => {
        sectionDocs.push(
          <DocContainer>
            <Link to={node.path}>
              <OffsetLi
                selected={
                  this.props.location &&
                  node.path === this.props.location.pathname
                }
              >
                <h6>{node.title}</h6>
              </OffsetLi>
            </Link>
          </DocContainer>
        )
      })
      listItems.push(
        <li className="section">
          <h5 className="tocHeading">{sectionTitles[idx]}</h5>
          <ul className="sectionItems">{sectionDocs}</ul>
        </li>
      )
    })
    return listItems
  }

  render() {
    return (
      <TableOfContentsContainer>
        <ul>{this.nodeListItems()}</ul>
      </TableOfContentsContainer>
    )
  }
}

const TableOfContentsContainer = styled.div`
  padding: ${props => props.theme.sitePadding};

  & > ul,
  .sectionItems {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  p,
  h6 {
    display: inline-block;
    font-weight: normal;
    margin: 0;
  }

  .tocHeading {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

const DocContainer = styled.div`
  h6,
  p {
    color: ${props => props.theme.ink};
    margin: 0;
    line-height: 1.5;
  }
  li {
    margin: 0;
  }
  &:hover {
    li {
      span {
        border-bottom: 1px solid black;
      }
    }
  }
`

const OffsetLi = styled.li`
  padding-left: 1rem;
  h6 {
    color: ${({ selected, theme: { ink, selectedLink } }) =>
      selected ? selectedLink : ink};
  }
`

export default TableOfContents

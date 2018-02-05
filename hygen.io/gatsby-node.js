const path = require("path");
const _ = require("lodash");
const webpackLodashPlugin = require("lodash-webpack-plugin");

exports.onCreateNode = ({node, boundActionCreators, getNode}) => {
  const {createNodeField} = boundActionCreators;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.slug)}`;
    }
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }
    createNodeField({node, name: "slug", value: slug});
  }
};

exports.createPages = ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators;

  return new Promise((resolve, reject) => {
    const docPage = path.resolve("src/templates/doc.jsx")
    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                frontmatter {
                  type
                }
                fields {
                  slug
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off"*/
          console.log(result.errors);
          reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
            createPage({
              path: edge.node.fields.slug,
              component: docPage,
              context: {
                slug: edge.node.fields.slug
              }
            })
        })
      })
    );
  });
};

exports.modifyWebpackConfig = ({config, stage}) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};

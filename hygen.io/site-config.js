module.exports = {
  docsDir: `${__dirname}/../content`, // The name of the directory that contains docs or docs.
  siteTitle: 'Hygen', // Site title.
  siteTitleAlt: 'Hygen - The scalable code generator that saves you time.', // Alternative site title for SEO.
  siteLogo: '/logo-meta.png', // Logo used for SEO and manifest.
  siteUrl: 'https://www.hygen.io', // Domain of your website without pathPrefix.
  pathPrefix: '/', // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: 'Hygen - The scalable code generator that saves you time.', // Website description used for RSS feeds/meta description tag.
  googleAnalyticsID: 'UA-7131053-23', // GA tracking ID.
  googleFonts: ['Source Sans Pro:300,400,700'],
  docSearch: {
    apiKey: '8eb34147bbf73c81783f18b42ce01614',
    indexName: 'hygen',
    inputSelector: '#algolia-doc-search',
    debug: false // Set debug to true if you want to inspect the dropdown
  },
  stories: [
    {
      title: "Speeding up your project’s development with scaffolds",
      avatar: "https://cdn-images-1.medium.com/fit/c/120/120/1*6MU5HEhXz8m0yZsOXet4Vw.png",
      link: "https://medium.com/@fccoelho7/speeding-up-your-projects-developing-with-custom-scaffolds-9ff88da7b4e9",
      tagline: "By Fabio Carvalho on Medium.com"
    },

    {
      title: "Improve Developer Productivity with Generators and Team Conventions",
      avatar: "https://cdn-images-1.medium.com/fit/c/120/120/1*8FoXT_YXKtvSkSoulmhOZQ.jpeg",
      link: "https://blog.echobind.com/improve-developer-productivity-with-generators-and-team-conventions-2b79f5244783",
      tagline: "By Chris Ball on Medium.com"
    },
    {
      title: "Javascript Jabber Ep. 312: Hygen w/Dotan Nahum",
      avatar: "https://devchat.tv/wp-content/uploads/2016/04/javascript_jabber_thumb.jpg",
      link: "https://devchat.tv/js-jabber/jsj-312-hygen-with-dotan-nahum/",
      tagline: "By Dotan Nahum on Javascript Jabber"
    },
    {
      title: "Supercharge your CreateReactApp workflow with Hygen",
      avatar: "https://cdn-images-1.medium.com/fit/c/120/120/1*qyTVPi5bg0s9pbFf_CBnWg.png",
      link: "https://medium.com/@jondot/supercharge-your-createreactapp-workflow-with-hygen-a9e6f1ca98e9",
      tagline: "By Dotan Nahum on Medium.com"
    },

  ],
  usedIn: [
    {
      image: 'redux.svg',
      width: 100,
      title: 'Redux',
      link: 'redux',
      content:
        'Generators are self-contained and folder structure makes up the command structure. Complex is easy but simple is hard.'
    },
    {
      image: 'node.svg',
      width: 95,
      title: 'Express.js',
      link: 'express',
      content:
        'Contextual template lookup, pull requests that look nice and clean, structured file organization, make generators fun again!'
    },
    {
      image: 'react.svg',
      width: 175,
      title: 'React Native',
      link: 'react-native',
      content:
        'Constantly benchmarked and dependencies are carefully considered to shorten startup and generation time.'
    }
  ],
  features: [
    {
      image: 'simple.svg',
      title: 'Simplicity is Key',
      content:
        'Generators are self-contained and folder structure makes up the command structure. Complex is easy but simple is hard.'
    },
    {
      image: 'scalable.svg',
      title: 'Scales With Any Team',
      content:
        'Contextual template lookup, pull requests that look nice and clean, structured file organization, make generators fun again!'
    },
    {
      image: 'fast.svg',
      title: 'Fast is a Feature',
      content:
        'Constantly benchmarked and dependencies are carefully considered to shorten startup and generation time.'
    }
  ],
  copyright: 'Copyright © 2018. Dotan Nahum', // Copyright string for the footer of the website and RSS feed.
  themeColor: '#F722B1', // Used for setting manifest and progress theme colors.
  backgroundColor: '#fff', // Used for setting manifest background color.
  // TODO: Move this literally anywhere better.
  toCSections: ['', 'Introduction', 'Ecosystem', 'Use Cases'], // Used to generate the Table Of Contents. Index 0 should be blank.
  theme: {
    // named colors:
    brand: '#F722B1',
    brandSecondary: '#8b8f94',
    accent: '#ADD2EB',
    accentDark: '#35495E',
    lightGrey: '#f9fbfd',
    darkGrey: '#91a2a3',
    ink: '#3a5975',
    errorRed: '#FF6666',
    codeEditBlue: '#2973b7',
    codeEditGreen: '#42b983',
    selectedLink: '#2097e4',
    white: '#fff',
    // content width:
    contentWidthLaptop: '680px',
    sitePadding: '20px'
  }
}

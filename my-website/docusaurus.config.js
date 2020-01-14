module.exports = {
  title: 'Hygen',
  tagline: 'The scalable code generator that saves you time.',
  url: 'https://www.hygen.io/',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'jondot', // Usually your GitHub org/user name.
  projectName: 'hygen', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'hygen',
      logo: {
        alt: 'hygen logo',
        src: 'img/logo.png',
      },
      links: [
        { to: 'docs/quick-start', label: 'Docs', position: 'right' },
        {
          href: 'https://github.com/jondot/hygen/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Links',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Docs',
              to: 'docs/quick-start',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/jondot/hygen/',
            },
          ],
        },
        {
          title: 'Use Cases',
          items: [
            {
              label: 'Redux',
              to: 'docs/redux',
            },
            {
              label: 'Express.js',
              to: 'docs/express',
            },
            {
              label: 'React Native',
              to: 'docs/react-native',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/hygen',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Dotan J. Nahum. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebar.js'),
          editUrl: 'https://github.com/jondot/hygen/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}

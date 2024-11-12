module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mugove grading`,
        short_name: `mugove`,
        start_url: `/`,
        background_color: `#008080`,
        theme_color: `#008080`,
        display: `standalone`,
        icon: `src/images/pwa_logo.png`, // This path is relative to the root of the site.
      },
    },

    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/index/`, `/components/UI/*`, `/fonts/*`, `/images/*`, `/static/*`, `/styles/*`, `/src/*`, `/classes/*`],
        workboxConfig: {
          globPatterns: ["**/*.{js,jpg,ttf,html,css,png}"],
        },
      },
    },
  ],
}

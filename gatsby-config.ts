import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = { 
  pathPrefix: `/speech-to-text`,
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,  
  plugins: [{
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `SpeechToText`,
      short_name: `SpeechToText`,
      description: `音声→Text`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#000000`,
      display: `standalone`,
      icon: `src/images/icon.png`,//アイコンのpathを指定
     },
   },
   `gatsby-plugin-offline`,
  ],
}

export default config

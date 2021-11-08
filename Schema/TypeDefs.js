const{ gql } = require( "apollo-server-express" );

const typeDefs = gql`
    type Link{
        url: String
    }
    
    type ogImage{
        url: String,
        width: String,
        height: String,
        type: String
    }

    type OGMeta{
        ogTitle: String,
        ogType: String,
        ogUrl: String,
        ogDescription: String,
        ogImage: ogImage,
        requestUrl: String,
        success: Boolean
    }

   type Query{
       linkInfo( url: String!): OGMeta
   }
`

module.exports = { typeDefs };
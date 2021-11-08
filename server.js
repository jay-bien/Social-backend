const { ApolloServer } = require( 'apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require( 'apollo-server-core');
const express = require( 'express' );

const { typeDefs } = require( './Schema/TypeDefs') ;
const { resolvers } = require( './Schema/Resolvers');


const app = express(); 

async function startApolloServer( typeDefs, resolvers ) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
      });

      await server.start();
      server.applyMiddleware({ app})

      await new Promise(resolve => {
        app.listen({ port: 4000 }, () => {
          console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
          resolve();
        });


    });
  
}

startApolloServer( typeDefs, resolvers );





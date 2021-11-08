const ogs = require('open-graph-scraper');
const axios = require('axios');


async function getOpenGraph( url ) {
  return new Promise( (resolve, reject) => {
    ogs({ url: url }, (err, results, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


const resolvers = {

    Query: {
        linkInfo: ( _, args ) => {
            return getOpenGraph(args.url);
        },
    },

}

module.exports = { resolvers }
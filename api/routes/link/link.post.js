import express from 'express';
import ogs from 'open-graph-scraper';


const router = express.Router();




router.post('/', async ( req, res ) => {

  console.log(req.body);
  const url = req.body.url;

  if(! url){
      return res.status( 401 ).send({
          data: null
      });
  };

  try{
    const response = await getOpenGraph( url );
    console.log({ response});
    return res.status( 200 ).send({
      data: response
    });
  } catch( e ){

    console.log({ e });
      return res.status( 404 ).send({
          data: null
});
  }
});

export default router;



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
};



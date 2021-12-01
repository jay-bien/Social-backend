import express, {Request, Response } from 'express';
import ogs from 'open-graph-scraper';
import { unfurl } from 'unfurl.js';




const router = express.Router();


router.post('/', async ( req: Request, res: Response) => {
    console.log(req.body);
    const url = req.body.url;
  
    if(url){
        return res.status( 401 ).send({
            data: null
        });
    };
  
    try{


      const response = await unfurl( url );
      



      return res.status( 200 ).send({
        data: response
      });
    } catch( e ){
  
      console.log({ e });
        return res.status( 404 ).send({
            data: null
  });
    }





    return;
})



async function getOpenGraph( url: string ): Promise<{}> {
    return new Promise( (resolve, reject) => {
      ogs({ url: url }, ( err, results, response ) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  
  
  

  type ogResponse = {
      ogSiteName: string,
      ogUrl: string,
      ogTitle: string,
      ogDescription: string,
      ogImage: string,
      ogType: string,
      author: string,
      allosUrl: string, //linkedin
      twitterTitle: string,
      twitterDescription: string,
      twitterCard: string,
      twitterSite: string,

  }









export default router;
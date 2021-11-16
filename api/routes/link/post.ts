import express, {Request, Response } from 'express';
import ogs from 'open-graph-scraper';
import axios from 'axios';
import { unfurl } from 'unfurl.js';
import got from 'got';


import metascraper from 'metascraper';
import desc from 'metascraper-description';
import author from 'metascraper-author';
import img from 'metascraper-image';
import title from 'metascraper-title';
import logo from 'metascraper-logo';
import video from 'metascraper-video';




const router = express.Router();

const scraper = metascraper([
    title(),
    author(),
    desc(),
    img(),
    video(),
    logo(),
]);

router.post('/', async ( req: Request, res: Response) => {
    console.log(req.body);
    const url = req.body.url;
  
    if(! url){
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
  
  async function getMetaScraper( targetUrl: string ): Promise<{}>{

   const unf = await unfurl(targetUrl);
   console.log({unf});


    const response = await got( targetUrl );
    const { body: html, url } = response;



    const metadata = await scraper({ html, url });

    return new Promise( resolve =>{ });

// do work here 
// fetch data and then return data 



  }
  

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
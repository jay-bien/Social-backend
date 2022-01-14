import { sign } from 'jsonwebtoken';
import request  from 'supertest';
import app from '../../../app';
import { createUserGetCookie, signInGetCookie } from '../../../test/utils';
import { PATHS } from '../../constants';
import { email, password  } from './constants';


it("Has a post route handler listening.", async ( ) => {


    const response = await request( app )
        .post(PATHS.votes)
        .send({})
        

        expect( response.status ).not.toBe( 404 );





});

it("Has a get route handler listening.", async ( ) => {


    const response = await request( app )
    .get( PATHS.votes )
    .send({ })

    expect( response.status ).not.toBe( 404 );




});

it('Returns an unauthorized error if user tries to post  not logged in', async () => {

    const response = await request( app )
    .post( PATHS.votes )
    .send({ 

    })


    expect( response.status ).toBe( 401 )

})



it("Returns a bad request error if comment id is not incliuded.", async ( ) => {

})


it( "Returns a 200 and increments the like counter and like collection if request is good.", async ( ) => {

})

it("Returns a 200 and decrements the like counter if user likes twice", async( ) => {

})


it("Returns a 200 and incrments the dislike counter and dislike collection.",  async ( ) => {

})

it("Returns a 200 and decrements the dislike collection and count if request is valid", async ( ) => {

})
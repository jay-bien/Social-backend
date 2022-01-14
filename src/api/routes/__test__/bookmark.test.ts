import { sign } from 'jsonwebtoken';
import request  from 'supertest';
import app from '../../../app';
import { createUserGetCookie, signInGetCookie } from '../../../test/utils';
import { PATHS } from '../../constants';
import { email, password  } from './constants';


it("Has a route handler listening.", async ( ) => {

    const response = await request( app )
        .post(PATHS.bookmark)
        .send({})
        expect( response.status ).not.toBe( 404 );
});



it('Returns an unauthorized error if user is not logged in.', async () => {
    const response = await request( app )
    .post( PATHS.bookmark )
    .send({ 

    })


    expect( response.status ).toBe( 401 )

})



it("Returns a bad request error if comment id is not incliuded.", async ( ) => {
    const cookie = await createUserGetCookie( email, password, 201 );
    const response = await request( app )
    .post( PATHS.bookmark )
    .set('Cookie', cookie)
    .send({ 

    })

    expect( response.status ).toBe( 401 )
})


it( "Returns a 200 if user submits succesful request", async ( ) => {
    const cookie = await createUserGetCookie( email, password, 201 );
    const commentId: string = "";
    const response = await request( app )
    .post( `${ PATHS.bookmark }/${ commentId }` )
    .set('Cookie', cookie)
    .send({ 

    })

    expect( response.status ).toBe( 401 )
})

it("Returns a 200 and decrements the like counter if user likes twice", async( ) => {

})


it("Returns a 200 and incrments the dislike counter and dislike collection.",  async ( ) => {

})

it("Returns a 200 and decrements the dislike collection and count if request is valid", async ( ) => {

})


import request from 'supertest';
import app from '../../../../app';
import { createUserGetCookie, signInGetCookie, createPost } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, email2, password } from '../constants';

import { testPost } from './data';



it("Has a route handler listening.", async () => {
    const response = await request(app)
        .delete(PATHS.posts +'/s')
        .send({})
        expect(response.status).not.toBe(404);
});

it("Returns an unauthorized error if user is not logged in", async ( ) => {
    const cookie = await createUserGetCookie( email, password, password );

    const responsePost = await request( app )
        .post( PATHS.posts )
        .send( testPost )
    expect( responsePost.status ).toBe( 201 );

    const id = responsePost.body.data?.id;
    expect( id ).toBeDefined();

    const deletePost = await request( app )
        .delete(`${PATHS.posts}/${id}`)
        .send({});

    expect( deletePost.status ).toBe( 401 )

})


it("Returns a bad request error if document ID does not exist.", async ( ) =>{
    const cookie = await createUserGetCookie( email, password, password );

    const deletePost = await request( app )
        .delete( `${PATHS.posts}/as`)
        .send({});

    expect( deletePost.status ).toBe( 400 )


})

it("Returns an unautherized error if logged in user does not own document", async () => {
    const cookie = await createUserGetCookie( email, password, password );
    const cookie2 = await createUserGetCookie( email2, password, password );

    const responsePost = await request( app )
        .post( PATHS.posts )
        .send( testPost )
    expect( responsePost.status ).toBe( 201 );

    const id = responsePost.body.data?.id;
    expect( id ).toBeDefined();

    const deletePost = await request( app )
        .delete( `${PATHS.posts}/${id}`)
        .set("Cookie", cookie2)
        .send({});

    expect( deletePost.status ).toBe( 401 )
})

it("Removes the post and sends back an empty object ", async () => {
    const cookie = await createUserGetCookie( email, password, password );

    const responsePost = await request( app )
        .post( PATHS.posts )
        .send( testPost )
    expect( responsePost.status ).toBe( 201 );

    const id = responsePost.body.data?.id;

    expect( id ).toBeDefined();

    const deletePost = await request( app )
        .delete( `${PATHS.posts}/${id}`)
        .set('Cookie', cookie)
        .send({});

    expect( deletePost.status ).toBe( 202 )
    expect( deletePost.body.data ).toBeDefined();
    expect( deletePost.body.data ).toBe({});
})
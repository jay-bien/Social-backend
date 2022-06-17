

import request from 'supertest';
import app from '../../../../app';
import { createUserGetCookie, signInGetCookie, createPost } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, password } from '../constants';

import { testPost } from './data';



it("Has a route handler listening.", async () => {

    const response = await request(app)
        .get(PATHS.posts)
        .send({})
    expect(response.status).not.toBe(404);
});


it("Returns a valid post if post exists", async () => {
    const cookie = await createUserGetCookie( email, password, password );
    const response = await request( app )
        .post( PATHS.posts )
        .set('Cookie', cookie)
        .send( testPost )


    const id = response.body.data?.id;

    const getResponse = await request( app )
        .get( `${PATHS.posts}/${id}`)
        .send({})
    
    const fetchedPost = getResponse.body.data;
    // expect( 1 ).toBe( false );

    expect( fetchedPost.id ).toBe( id );
})

it("Returns all available posts.", async ( )=>{

    const response = await request( app )
        .get(PATHS.posts)
        .send({})

    const fetchedPosts = response.body.data;

    expect( response.status ).toBe( 200 );
    expect( Array.isArray( fetchedPosts ) ).toBe( true )
})




import request from 'supertest';
import app from '../../../../app';
import { createUserGetCookie, signInGetCookie, createPost } from '../../../../test/utils';
import { PATHS } from '../../../constants';

import { email, password } from '../constants';
import { testPost } from './data';



it("Has a route handler listening.", async () => {

    const response = await request(app)
        .put(PATHS.posts + '/a')
        .send({})
        expect(response.status).not.toBe( 404 );

});




it("Route handler exists for put route", async () => {
    const cookie = await createUserGetCookie( email, password, password );
    const response = await request( app )
        .put( PATHS.posts + '/id' )
        .set('Cookie', cookie)
        .send({})

        expect( response.status ).not.toBe( 404 );
})

it("Returns an unauthorized error if user is not logged in", async () => {

    const cookie = await createUserGetCookie( email, password, password );
    const response = await request( app )
        .post(PATHS.posts )
        .set('Cookie', cookie )
        .send( testPost )
    expect( response.status ).toBe( 201 );
    const id = response.body.data.id;
    const newTitle = "test title edited " + Math.floor( Math.random() * 9999999 );
    const badCookie = "invalidcookie";
    const putResponse = await request( app )
        .put(`${PATHS.posts}/${id}`)
        .set('Cookie', badCookie)
        .send({ title: newTitle })
     expect( response.status ).toBe( 401 );
})

it("Returns a 200 and modified post if valid request.", async ( ) => {
    const cookie = await createUserGetCookie( email, password, password );
    const response = await request( app )
        .post(PATHS.posts )
        .set('Cookie', cookie )
        .send( testPost )

        expect( response.status ).toBe( 201 );


    const id = response.body.data.id;

    const newTitle = "test title edited " + Math.floor( Math.random() * 9999999 );
    const putResponse = await request( app )
        .put(`${PATHS.posts}/${id}`)
        .set('Cookie', cookie)
        .send({ title: newTitle })

        expect( putResponse.status ).toBe( 200 );
        expect( putResponse.body.title ).toBe( newTitle );
        expect( putResponse.body.id ).toBe( id );

})
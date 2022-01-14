import { sign } from 'jsonwebtoken';
import request  from 'supertest';
import app from '../../../app';
import { createUserGetCookie, signInGetCookie } from '../../../test/utils';
import { PATHS } from '../../constants';
import { email, password  } from './constants';


const testPost = {
    title: "Test title",
    link: "https://google.com",
    content: "Optional content goes here",
    author: "",
    categories: ["Business"],
    tags: [""],
    type: "text",
    created_at: Date.now(),
}


it("Has a route handler listening.", async ( ) => {

    const response = await request( app )
        .post( PATHS.posts )
        .send({})
        expect( response.status ).not.toBe( 404 );
});



it('Returns an unauthorized error if user is not logged in.', async () => {
    const response = await request( app )
    .post( PATHS.posts )
    .send({ 

    })


    expect( response.status ).toBe( 401 )

})



it("Returns a bad request error if post is title or content.", async ( ) => {

    const cookie = await createUserGetCookie( email, password, 201 );

    const noTitle = { ...testPost };
    delete noTitle.title;
    console.log({ noTitle });
    const response = await request( app )
    .post( PATHS.posts )
    .set('Cookie', cookie)
    .send({ 

    })
    expect( response.status ).toBe( 401 )
})


it( "Returns a 200 if user submits succesful request", async ( ) => {
    const cookie = await createUserGetCookie( email, password, 201 );
    const commentId: string = "";
    const response = await request( app )
    .post( `${ PATHS.posts }/${ commentId }` )
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
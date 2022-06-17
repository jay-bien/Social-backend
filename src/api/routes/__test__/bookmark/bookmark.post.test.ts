import request  from 'supertest';
import app from '../../../../app';
import { createPost, createUserGetCookie, signInGetCookie } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, password  } from '../constants';




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



it("Returns a bad request error if comment id is not included.", async ( ) => {
    const cookie = await createUserGetCookie( email, password, password, 201 );
    const response = await request( app )
    .post( `${PATHS.bookmark}/`)
    .set('Cookie', cookie)
    .send({ 

    })

    expect( response.status ).toBe( 400 )
})

it("Returns a bad request error if post id is malformatted.", async () => {

    const cookie = await createUserGetCookie( email, password, password, 201 );
    const response = await request( app )
        .post( `${PATHS.bookmark}/a` )
        .set("Cookie", cookie)
        .send(
            {}
        )
        expect( response.status ).toBe( 400 );
});


it( "Creates a bookmark document and returns it.", async ( ) => {
    const cookie = await createUserGetCookie( email, password, password, 201 );
    const post = await createPost({ title: "Test title", type:"text"}, {
        cookie,
        expectCode: 201
    });

    const commentId: string = post.id   ;
    const response = await request( app )
        .post( `${ PATHS.bookmark }/${ commentId }` )
        .set('Cookie', cookie)
        .send({ })
    expect( response.status ).toBe( 201 )
})



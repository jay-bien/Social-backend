import request  from 'supertest';
import app from '../../../../app';
import { createPost, createUserGetCookie, signInGetCookie } from '../../../../test/utils';
import { PATHS } from '../../../constants';
import { email, password  } from '../constants';




it("Has a route handler listening.", async ( ) => {

    const response = await request( app )
        .put(PATHS.bookmark + '/id')
        .send({})
        expect( response.status ).not.toBe( 404 );
});



it('Returns an unauthorized error if user is not logged in.', async () => {
    const response = await request( app )
    .put( PATHS.bookmark + '/id' )
    .send({ 

    })
    expect( response.status ).toBe( 401 )

})

it("Returns a not found error if post id is malformatted.", async () => {

    const cookie = await createUserGetCookie( email, password, password, 201 );
    const response = await request( app )
        .post( `${PATHS.bookmark}/a` )
        .set("Cookie", cookie)
        .send(
            {}
        )
        expect( response.status ).toBe( 404 );
});



it("Returns a not found error if post id is invalid.", async ( ) => {
    const cookie = await createUserGetCookie( email, password, password, 201 );
    const response = await request( app )
    .post( PATHS.bookmark +'/id')
    .set('Cookie', cookie)
    .send({ 

    })

    expect( response.status ).toBe( 400 )
})




it( "Successfully updates bookmark.", async ( ) => {
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

        let bookmark = response.body.data;
        expect( response.status ).toBe( 201 );
        expect( Object.keys( bookmark ).length ).toBeGreaterThan( 0 );

    //
    const response2 = await request( app )
        .post( `${ PATHS.bookmark }/${ commentId }` )
        .set('Cookie', cookie)
        .send({ })
    
    let noBookmark = response2.body.data;
    expect( Object.keys( noBookmark ).length ).toBe( 0 );
})



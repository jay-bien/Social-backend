import request from 'supertest';
import app from '../../../../app';
import { createPost, createUserGetCookie } from '../../../../test/utils';
import { PATHS } from '../../../constants';

import { email, password } from '../constants';



it("Has a route handler listening.", async ( ) => {

    const cookie = await createUserGetCookie( email, password, password ); 
    const response = await request( app )
        .get(`${PATHS.bookmark}/id`)
        .set("Cookie", cookie)
        .send({})
    const postId = response.body.id;
    expect( response.status ).not.toBe( 404 );
})

it("Returns an unauthorized error if user is not logged in", async ( )  =>{
    const response = await request( app )
        .get( PATHS.bookmark + '/bookmarkid' )
        .send({

        })

        expect( response.status ).toBe( 401 )
})

it("Returns a bad request error if post id is invalid.", async ( ) => {

    const cookie = await createUserGetCookie( email, password, password );

    const response = await request( app )
        .get(PATHS.bookmark + 'bookmarkId')
        .set( "Cookie", cookie )
        .send({})

        expect( response.status ).toBe( 400 )


})

it("Returns the bookmark if request is properly formatted.", async ( ) => {
  const cookie = await createUserGetCookie( email, password, password );
  const post = await createPost({ title: "Bookmark test", type: "text"}, {
      cookie,
      expectCode: 201
  });
  
  

  const postId: string = post.id   ;
  const response = await request( app )
      .post( `${ PATHS.bookmark }/${ postId }` )
      .set('Cookie', cookie)
      .send({ })

    const bookmark = response.body.data;

    expect( bookmark ).toBeDefined();
    expect( bookmark.commentId ).toBe( postId );
})
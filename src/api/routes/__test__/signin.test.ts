import { sign } from 'jsonwebtoken';
import request  from 'supertest';
import app from '../../../app';
import { createUserGetCookie, signInGetCookie } from '../../../test/utils';
import { PATHS } from '../../constants';
import { email, password  } from './constants';

it( 'Returns a 400 error if password or email are empty.',  async ( ) => {

    // SignInTest() from ../test/utils
    // args: ( email, password, status code to expect )
    // throws error if incorrect code
    //  rets cookie
    await signInGetCookie( email, "", 400);
    await signInGetCookie( "", password, 400);

})
it( 'Returns a 400 error if email is invalid.' , async ( ) => {
    const email0 = "@gmail.com";
    const email1 = "j@gmail.com";
    const email2 = " jay@gmail";
    const email3 = "jaygmail.com";
    const email4 = "jay@.com";

    // SignInTest() from ../test/utils
    // args: ( email, password, status code to expect )
    // throws error if incorrect code
    //  rets cookie
    await signInGetCookie( email0, password, 400 );
    await signInGetCookie( email1, password, 400 );
    await signInGetCookie( email2, password, 400 );
    await signInGetCookie( email3, password, 400 );
    await signInGetCookie( email4, password, 400 );

    return;
    

} )


it( 'Returns a 400 error if email is not found.', async ( ) => {
    await signInGetCookie( "gobbledygooke@gmail.com", password, 400 );
})

it( 'Returns a 200 and sets a cookie email and password are valid.',  async ( ) => {
    const cookie = await createUserGetCookie( email, password, 201 );
    await signInGetCookie( email, password, 200 );
});


it( 'Sets a cookie on successful signin.',  async ( ) => {
    const cookie = await createUserGetCookie( email, password, 201 );
    const cookie1 = await signInGetCookie( email, password, 200 );
    expect( Array.isArray( cookie1 ) ).toBe( true );
    expect( cookie1.length ).toBeGreaterThan( 0 );

})
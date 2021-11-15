import  { email, password } from './constants';
import { createUserGetCookie } from '../../../test/utils';



it( 'Returns a 400 error if no password or email',  async ( ) => {

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 

    await createUserGetCookie( email, "", 400 );
    await createUserGetCookie( "", password, 400 );

    return;

})
it( 'Returns a 400 error if email is invalid.' , async ( ) => {
    const email0 = "@gmail.com";
    const email1 = "jay@.com";
    const email2 = " jay@gmail";
    const email3 = "jaygmail.com";

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 
   await createUserGetCookie( email0, password, 400 );
   await createUserGetCookie( email1, password, 400 );
   await createUserGetCookie( email2, password, 400 );
   await createUserGetCookie( email3, password, 400 );
    return;

} )
it( 'Returns a 400 error if password is too short or too long.' , async ( ) => {
    const password0 = "12345";
    const password1 = "jksdfhsdjkfhkjsdhkjfhsjk";

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 
    await createUserGetCookie( email, password0, 400 )
    await createUserGetCookie( email, password1, 400 )

    return;

} );

it( "Creates user and returns 201 with valid email & password.", async ( ) => {
    await createUserGetCookie( email, password, 201 );
    return;
})

it( 'Returns a 400 error if email is a duplicate.', async ( ) => {

    await createUserGetCookie( email, password, 201 );
    await createUserGetCookie( email, password, 400 );

    return;
});






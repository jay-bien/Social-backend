import  { email, password } from '../constants';
import { createUserGetCookie } from '../../../../test/utils';



it( 'Returns a 400 error if no password or email',  async ( ) => {

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 

    await createUserGetCookie( email, "", password, 400 );
    await createUserGetCookie( "", password, password, 400 );

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
   await createUserGetCookie( email0, password, password, 400 );
   await createUserGetCookie( email1, password, password, 400 );
   await createUserGetCookie( email2, password, password, 400 );
   await createUserGetCookie( email3, password, password, 400 );
    return;

} )
it( 'Returns a 400 error if password is too short or too long.' , async ( ) => {
    const password0 = "12345";
    const password1 = "jksdfhsdjkfhkjsdhkjfhsjk";

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, passwordConfirm, expectedStatusCode )
    // rets: cookie 
    await createUserGetCookie( email, password0, password0, 400 )
    await createUserGetCookie( email, password1, password0, 400 )
    return;
} );

it( 'Returns a 400 error if email is a duplicate.', async ( ) => {
    await createUserGetCookie( email, password, password, 201 );
    await createUserGetCookie( email, password, password, 400 );

    return;
});
it( 'Returns a 400 error if password and password confirm do not match.', async ( ) => {
    await createUserGetCookie( email, password, password + "1", 400 );
    await createUserGetCookie( email, password, "." + password , 400 );
    return;
});

it( "Creates user and returns 201 with valid email & password.", async ( ) => {
    await createUserGetCookie( email, password, password, 201 );
    return; 
})

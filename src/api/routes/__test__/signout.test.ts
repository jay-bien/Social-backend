import  { email, password } from './constants';
import { createUserGetCookie, getCurrentUser, signOut } from '../../../test/utils';



it( 'Returns a 200 and deletes session.',  async ( ) => {

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 
    const cookie = await createUserGetCookie( email, password, 201 );


    // func: getCurrentUser( ) from utils
    //  args: ( statusCode, cookie = null )
    // rets: { user{ ... } } || {user : null  }
    const res = await getCurrentUser( 200, cookie );

    // func: signOut( ) from utils
    //  args: ( statusCode )
    // rets: string[] set-cookie header
    const cookie1 = await signOut( 200);
    expect( cookie1[ 0 ] ).toBe( 'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly' );
    return;

})


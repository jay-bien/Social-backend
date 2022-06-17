import  { email, password } from '../constants';
import { createUserGetCookie, getCurrentUser } from '../../../../test/utils';



it( 'Returns an unauthorized error if no cookie.',  async ( ) => {

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 

    const cookie = await createUserGetCookie( email, password, password, 201 );
    const user = await getCurrentUser( 401 );
    return;

})
it( 'Returns an unauthorized error if bad cookie.',  async ( ) => {

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 

    const cookie = await createUserGetCookie( email, password, password, 201 );
    const user = await getCurrentUser( 401, ["express://badcookie"] );
    return;

})

it( 'Returns a 200 and matching user if valid cookie.',  async ( ) => {

    // func: createUserGetCookie( ) from utils
    //  args: ( email, password, expectedStatusCode )
    // rets: cookie 

    const cookie = await createUserGetCookie( email, password, password, 201 );

    // func: getCurrentUser( ) from utils
    //  args: ( statusCode, cookie = null )
    // rets: { user{ ... } } || {user : null  }
    const user = await getCurrentUser( 200, cookie );
    
    expect( user.email ).toBe( email );

    return;

})
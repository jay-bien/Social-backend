import request  from 'supertest';
import app from '../../../../app';
import { PATHS } from '../../../constants';

it("Has a route handler listening.", async ( ) => {

    const response = await request( app )
        .put(PATHS.bookmark + '/id')
        .send({})
        expect( response.status ).not.toBe( 404 );
});

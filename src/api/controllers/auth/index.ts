import { signin } from './signin';
import { signup } from './signup';
import { signout } from './signout';
import { currentUser } from './current-user';



const authController = {
    signin,
    signup,
    signout,
    currentUser
}

export default authController;
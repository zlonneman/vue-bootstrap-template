// import store from '../src/store/index.js';
// import { userRoleEnum, getKeyByValue } from "./modules/helpers";

function can(permission) {
    // let user = store.state.currentUser;
    let user = {name: 'Zach', role: 'Admin'}
    let pass = false;

    if (user) {
        if (!user.role) return;
        let role = user.role;
        // let role = getKeyByValue(userRoleEnum, user.UserRoleId);

        switch (permission) {
            case 'access-admin-sidebar':
                pass = ['Admin'].includes(role);
                break;
            case 'do-something':
                pass = ['Admin', 'Other Person', 'This guy'].includes(role);
                break;
            default:
                pass = false;
                break;
        }
    }

    return pass;
}

export {
    can
};

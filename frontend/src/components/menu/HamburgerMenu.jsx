import { useEffect, useCallback } from 'react';

import UserProfile from '../user/UserProfile';
import NoUser from '../user/NoUser';

import { usePage } from '../../context/PageProvider';
import { useMenu } from '../../context/MenuProvider';
import { useUser } from '../../context/UserProvider';

import './menu.css'

/**
 * Renders the HamburgerMenu component.
 * @returns {JSX.Element} The rendered HamburgerMenu component.
 */
export default function HamburgerMenu() {
    const { menuActive } = useMenu();
    const { currentUserPageName } = usePage();
    const { userIdExists, changeUserId } = useUser();

    /**
     * Retrieves the cached user from local storage and sets it as the current user.
     */
    const getCachedUser = useCallback(() => {
        try {
            const cachedUser = JSON.parse(localStorage.getItem('user'));
            if (cachedUser) {
                changeUserId(cachedUser.name, cachedUser.surname);
            }
        } catch (error) {
            if (error !== 'No Cached User Info') {
                console.error('Error while getting cached user:', error);
            }
        }
    }, [changeUserId]);

    useEffect(() => {
        getCachedUser();
    }, [getCachedUser]);

    return (
        <div id="menu" className={`${menuActive ? 'active' : ''} from-${currentUserPageName}`}>
            <div className='menu-img-container img-one'>
                {/* <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img'></img> */}
            </div>
            <div id='user' className={userIdExists ? 'user-exists' : 'no-user'}>
                {
                    userIdExists ? (
                        <UserProfile />
                    ) : (
                        <NoUser />
                    )
                }
            </div>
            <div className='menu-img-container img-two'>
                {/* <img src={hundredDollarsImg} alt="hundred dollars" className='menu-img'></img> */}
            </div>
        </div>
    )
}
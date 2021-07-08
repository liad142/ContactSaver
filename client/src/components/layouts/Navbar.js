import React,{Fragment,useContext} from 'react';
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import AuthContext from '../../context/auth/authContext'

import ContactContext from "../../context/contact/contactContext";

const NavBar = ({title,icon}) => {
    const authContext = useContext(AuthContext)
    const {isAuthenticated,logout,user} =  authContext

    const contactContext = useContext(ContactContext)
    const {clearContacts} = contactContext

    const onLogout = () =>{
        logout()
        clearContacts()
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt">

                    </i> <span className={'hide-sm'}>Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestinks = (
        <Fragment>
            <li>
                <Link to={'/register'}>Register</Link>
            </li>
            <li>
                <Link to={'/login'}>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className='navbar bg-dark'>
            <h1 className={icon}>{title}</h1>
            <ul>
                {/*//בודק כאן האם אני מחובר אם כן מראה את הAUTHLINKS אם לא GUESTTLINKS*/}
                {isAuthenticated? authLinks : guestinks}
            </ul>
        </div>
    );
};
NavBar.protoTypes = {
    title:PropTypes.string.isRequired,
    icon:PropTypes.string
}
NavBar.defaultProps = {
    title:'Contact Saver',
    icon:'fas fa-id-card-alt'
}
export default NavBar;

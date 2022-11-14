//hooks
import { useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
//components
import AuthContext from '../../../Store/auth-context';
//styles
import classes from "./NavLinks.module.css";

const NavLinks = () =>
{
    const authCtx = useContext( AuthContext );
    const navigate = useNavigate();

    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () =>
    {
        authCtx.logout();
        navigate( "/" );
    };

    return (
        <nav>
            <ul>
                { !isLoggedIn && (
                    <li>
                        <NavLink end className={ ( navData ) => navData.isActive ? classes.active : "" } to="/" >Start</NavLink>
                    </li>
                ) }
                { isLoggedIn && (
                    <li>
                        <NavLink end className={ ( navData ) => navData.isActive ? classes.active : "" } to="/movies" >Movies</NavLink>
                    </li>
                ) }
                { isLoggedIn && (
                    <li>
                        <NavLink end className={ ( navData ) => navData.isActive ? classes.active : "" } to="/addmovie" >Add Movie</NavLink>
                    </li>
                ) }
                { isLoggedIn && (
                    <li>
                        <NavLink end className={ ( navData ) => navData.isActive ? classes.active : "" } to="/profile" >Profile</NavLink>
                    </li>
                ) }
                { isLoggedIn && (
                    <li>
                        <button onClick={ logoutHandler }>Logout</button>
                    </li>
                ) }
            </ul>
        </nav>
    );

};

export default NavLinks;
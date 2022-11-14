import React from "react";
//hooks
import { useState, useEffect, useCallback, createContext } from "react";

let logoutTimer;

const AuthContext = createContext(
    {
        token: '',
        isLoggedIn: false,
        login: ( token ) => { },
        logout: () => { }
    } );

const calculateRemainingTime = ( expirationTime ) =>
{
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date( expirationTime ).getTime();

    const remainingDuration = adjustedExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () =>
{
    const storedToken = localStorage.getItem( "token" );
    const storedExpirationDate = localStorage.getItem( "expirationTime" );

    const remainingTime = calculateRemainingTime( storedExpirationDate );
    //if token has 1 minute or less time left, remove it
    if ( remainingTime <= 60000 )
    {
        localStorage.removeItem( "token" );
        localStorage.removeItem( "expirationTime" );
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime
    };
};

//Managing the auth-related state
export const AuthContextProvider = props =>
{
    const tokenData = retrieveStoredToken();
    let initialToken;
    if ( tokenData )
    {
        //JWT token already stored in local storage
        initialToken = tokenData.token;
    }
    //JWT token state
    const [ token, setToken ] = useState( initialToken );

    //converts truthy or falsy values to true or false
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback( () =>
    {
        setToken( null );
        localStorage.removeItem( "token" );
        localStorage.removeItem( "expirationTime" );

        if ( logoutTimer )
        {
            clearTimeout( logoutTimer );
        }
    }, [] );

    const loginHandler = ( token, expirationTime ) =>
    {
        setToken( token );
        localStorage.setItem( "token", token );
        localStorage.setItem( "expirationTime", expirationTime );

        const remainingTime = calculateRemainingTime( expirationTime );
        //logout after 1 hour
        logoutTimer = setTimeout( logoutHandler, remainingTime );
    };
    //if token changes, which it should only do initially. If true, set timer to logout after 1h
    useEffect( () =>
    {
        if ( tokenData )
        {
            logoutTimer = setTimeout( logoutHandler, tokenData.duration );
        }
    }, [ tokenData, logoutHandler ] );

    const contextValue =
    {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={ contextValue }>
            { props.children }
        </AuthContext.Provider>
    );
};

export default AuthContext;
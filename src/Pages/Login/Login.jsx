import { Link, useNavigate } from 'react-router-dom';
// import { Navigate } from "react-router-dom";
//hooks
import { useState, useRef, useContext } from "react";
//components
import AuthContext from '../../Store/auth-context';

const Login = () =>
{
    const authCtx = useContext( AuthContext );

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const navigate = useNavigate();

    const [ isLoading, setIsLoading ] = useState( false );

    const submitHandler = e =>
    {
        e.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading( true );

        fetch( "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJA14tzz-jwI5s5VbaYwECkPfhfVj0RI8",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true,
                    } ),
                headers:
                {
                    "Content-Type": "application/json"
                },
            } ).then( ( res ) =>
            {
                setIsLoading( false );
                if ( res.ok )
                {
                    return res.json();
                }
                else
                {
                    return res.json().then( ( data ) =>
                    {
                        let errorMessage = "Authentication failed!";
                        // if ( data && data.error && data.error.message )
                        // {
                        //     errorMessage = data.error.message;
                        // }
                        throw new Error( errorMessage );
                    } );
                }
            } ).then( data =>
            {
                //SUCCESSFUL REQUEST & USER IS AUTHENTICATED
                const expirationTime = new Date(
                    new Date().getTime() + +data.expiresIn * 1000
                );
                authCtx.login( data.idToken, expirationTime.toISOString() );
                //Redirect to homepage
                // <Navigate to="/movies" />;
                navigate( "/movies", { replace: true } );
            } ).catch( err =>
            {
                alert( err.message );
            } );
    };

    return (
        <section>
            <h1>Log In</h1>
            <form onSubmit={ submitHandler }>
                <div>
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" placeholder="E-mail" required ref={ emailInputRef } />
                </div>
                <div>
                    <label htmlFor="password">Your Password</label>
                    <input type="password" id="password" placeholder="Pasword" required ref={ passwordInputRef } />
                </div>
                <div>
                    { !isLoading && <button type="submit">Log In</button> }
                    { isLoading && <p>Sending Request...</p> }
                    <Link to="">Forgot your password?</Link>
                </div>
            </form>
        </section>
    );
};

export default Login;
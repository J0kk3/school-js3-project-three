import React from "react";
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";
//components
import AuthContext from "../../Store/auth-context";

class Signup extends React.Component
{
    constructor ()
    {
        super();
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.state =
        {
            modalIsOpen: false,
            isLoading: false,
        };
    }

    static authCtx = AuthContext;

    showModal = e =>
    {
        e.preventDefault();
        this.setState( { modalIsOpen: true } );

    };

    closeModal = () =>
    {
        this.setState( { modalIsOpen: false } );
    };

    submitHandler = e =>
    {
        e.preventDefault();

        const enteredEmail = this.emailInputRef.current.value;
        const enteredPassword = this.passwordInputRef.current.value;

        this.setState( { isLoading: true } );

        fetch( "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJA14tzz-jwI5s5VbaYwECkPfhfVj0RI8",
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
                this.setState( { isLoading: false } );
                if ( res.ok )
                {
                    return res.json();
                }
                else
                {
                    return res.json().then( ( data ) =>
                    {
                        let errorMessage = "Authentication failed!";
                        if ( data && data.error && data.error.message )
                        {
                            errorMessage = data.error.message;
                        }
                        throw new Error( errorMessage );
                    } );
                }
            } ).then( data =>
            {
                //SUCCESSFUL REQUEST & USER IS AUTHENTICATED
                const expirationTime = new Date().getTime() + ( +data.expiresIn * 1000 );
                this.authCtx.login( data.idToken, expirationTime.toISOString() );
                //Redirect to homepage
                <Navigate to="/movies" replace={ true } />;
            } ).catch( err =>
            {
                alert( err.message );
            } );
    };

    render ()
    {
        return (
            <section>
                <h1>Sign Up</h1>
                <form onSubmit={ this.submitHandler }>
                    <div>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" placeholder="E-mail" required ref={ this.emailInputRef } />
                    </div>
                    <div>
                        <label htmlFor="password">Your Password</label>
                        <input type="password" id="password" placeholder="Pasword" required ref={ this.passwordInputRef } />
                    </div>
                    <div>
                        { !this.isLoading && <button type="submit">Sign Up</button> }
                        { this.isLoading && <p>Sending Request...</p> }
                        <Link to="">Forgot your password?</Link>
                    </div>
                </form>
            </section>
        );
    }
}

export default Signup;
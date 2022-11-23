import { Link } from 'react-router-dom';
//hooks
import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
//components
import AuthContext from '../../Store/auth-context';
import Modal from "../../Components/Modal/Modal";
import Backdrop from "../../Components/Modal/Backdrop";

const Login = () =>
{
    const authCtx = useContext( AuthContext );

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const navigate = useNavigate();

    const [ isLoading, setIsLoading ] = useState( false );

    const [ modalIsOpen, setModalIsOpen ] = useState( false );

    const showModal = () =>
    {
        setModalIsOpen( true );
    };

    const closeModal = () =>
    {
        setModalIsOpen( false );
    };

    let modalMessage;

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
                        modalMessage = data.error.message;
                        showModal();
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
                navigate( "/movies", { replace: true } );
            } ).catch( err =>
            {
                modalMessage = err.message;
                showModal();
            } );
    };

    return (
        <section>
            <h1>Log In</h1>
            <form onSubmit={ submitHandler }>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="E-mail" required ref={ emailInputRef } />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Pasword" required ref={ passwordInputRef } />
                </div>
                <div>
                    { !isLoading && <button type="submit">Log In</button> }
                    { isLoading && <p>Sending Request...</p> }
                    <Link to="">Forgot your password?</Link>
                </div>
            </form>
            { modalIsOpen && <Modal title={ "Login Failed" } message={ modalMessage } modalIsOpen={ modalIsOpen } showModal={ showModal } closeModal={ closeModal } /> }
            { modalIsOpen ? ( <Backdrop show closeModal={ closeModal } /> ) : null }
        </section>
    );
};

export default Login;
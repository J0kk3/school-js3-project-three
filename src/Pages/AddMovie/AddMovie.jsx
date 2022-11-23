import { useNavigate } from "react-router-dom";
//hooks
import { useRef, useState, useEffect } from "react";

const AddMovie = () =>
{
    const navigate = useNavigate();

    const titleInputRef = useRef();
    const shortDescriptionInputRef = useRef();
    const detailedDescriptionInputRef = useRef();
    const imgURLInputRef = useRef();

    const [ user, setUser ] = useState();

    useEffect( () =>
    {
        let userName;
        fetch( "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDJA14tzz-jwI5s5VbaYwECkPfhfVj0RI8",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        // idToken: authCtx.tokenData,
                        idToken: localStorage.getItem( "token" ),
                    } ),
                headers:
                {
                    "Content-Type": "application/json"
                },
            } ).then( ( res ) =>
            {
                res.json().then( ( data ) =>
                {
                    userName = data.users[ 0 ].email;
                    setUser( userName );
                } );
            } );
    }, [] );

    const SubmitMovieHandler = e =>
    {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredShortDescription = shortDescriptionInputRef.current.value;
        const enteredDetailedDescription = detailedDescriptionInputRef.current.value;
        const enteredImgURL = imgURLInputRef.current.value;

        const movieData =
        {
            title: enteredTitle,
            shortDescription: enteredShortDescription,
            detailedDescription: enteredDetailedDescription,
            imgURL: enteredImgURL,
            user: user,
        };
        //Redirect to /movies
        navigate( "/movies", { state: { movieData } } );
    };

    return (
        <div>
            <form onSubmit={ SubmitMovieHandler }>
                <input type="text" placeholder="Title" ref={ titleInputRef } />
                <input type="text" placeholder="Short Description" ref={ shortDescriptionInputRef } />
                <input type="textarea" placeholder="Detailed Description" ref={ detailedDescriptionInputRef } />
                <input type="text" placeholder="Image URL" ref={ imgURLInputRef } />
                <button type="submit">Submit Movie</button>
            </form>
        </div>
    );
};

export default AddMovie;
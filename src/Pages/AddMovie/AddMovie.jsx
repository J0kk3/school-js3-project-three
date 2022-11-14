import { useNavigate, useLocation } from "react-router-dom";
//hooks
import { useRef, useContext } from "react";
//components
import AuthContext from "../../Store/auth-context";

const AddMovie = () =>
{
    const authCtx = useContext( AuthContext );

    const navigate = useNavigate();
    const location = useLocation();

    const titleInputRef = useRef();
    const shortDescriptionInputRef = useRef();
    const detailedDescriptionInputRef = useRef();
    const imgURLInputRef = useRef();

    // const movieArr = [ {} ];

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
            user: authCtx.userId
        };

        const movies = location.state.movies;
        // movies.push( localStorage.SetItem( "movieArr", JSON.stringify( movieArr ) ) );
        localStorage.SetItem( "movieArr", JSON.stringify( movieData ) );
        movies.push( movieData );
        navigate( "/movies", { state: { movies: movies } } );

        // movieArr.push( { ...movieData } );
        //save movieArr to local storage
        // localStorage.setItem( "movieArr", JSON.stringify( movieArr ) );

        //reset all fields
        titleInputRef.current.value = "";
        shortDescriptionInputRef.current.value = "";
        detailedDescriptionInputRef.current.value = "";
        imgURLInputRef.current.value = "";

        //Redirect to /movies
        navigate( "/movies", { replace: true } );
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
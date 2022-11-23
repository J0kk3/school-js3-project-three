//hooks
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//components
import Card from "../../Components/UI/Card";

const Movies = () =>
{
    const [ movies, setMovies ] = useState( localStorage.getItem( "movieArr" ) ? JSON.parse( localStorage.getItem( "movieArr" ) ) : [] );
    const [ user, setUser ] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () =>
    {
        if ( location.state && location.state.movieData )
        {
            setMovies( movies => [ ...movies, location.state.movieData ] );
            localStorage.setItem( "movieArr", JSON.stringify( [ ...movies, location.state.movieData ] ) );
            window.history.replaceState( {}, document.title );
        };
    }, [] );

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

    const deleteMovie = ( index ) =>
    {
        const arr = [ ...movies ];
        arr.splice( index, 1 );
        setMovies( arr );
        localStorage.setItem( 'movieArr', JSON.stringify( arr ) );
    };

    return (
        <div>
            <div>
                { movies.map( ( movie, index ) =>
                {
                    return (
                        <div key={ index } className="divWrapper">
                            <Card className="divWrapper__content">
                                <div onClick={ () => navigate( `/movies/${ movie.title }`, { state: { movie } } ) }>
                                    <h1>{ movie.title }</h1>
                                    <p>{ movie.shortDescription }</p>
                                    <p>{ movie.user }</p>
                                    <img src={ movie.imgURL } alt={ movie.title } />
                                </div>
                                { user === movie.user && <button onClick={ () => deleteMovie( index ) }>Delete</button> }
                            </Card>
                        </div>
                    );
                } ) }
            </div>
        </div>
    );
};

export default Movies;
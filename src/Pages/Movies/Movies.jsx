//hooks
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Movies = () =>
{
    const [ movies, setMovies ] = useState( localStorage.getItem( "movieArr" ) ? JSON.parse( localStorage.getItem( "movieArr" ) ) : [] );
    const location = useLocation();

    //get movieArr from localstorage and set it to movieArr
    useEffect( () =>
    {
        if ( location.state )
        {
            setMovies( JSON.parse( location.state.movies ) );
            localStorage.setItem( "movieArr", JSON.stringify( JSON.parse( location.state.movies ) ) );
        }
        // const movieArr = [];
        // const storedMovieArr = JSON.parse( localStorage.getItem( "movieArr" ) );
        // if ( storedMovieArr )
        // {
        //     movieArr.push( ...storedMovieArr );
        //     setMovies( [ ...movieArr ] );
        // }
    }, [ location.state ] );


    return (
        <div>
            <div>
                { movies.map( ( movie, index ) =>
                {
                    return (
                        <div key={ index }>
                            <h1>{ movie.title }</h1>
                            <p>{ movie.shortDescription }</p>
                            <p>{ movie.user }</p>
                            <img src={ movie.imgURL } alt={ movie.title } />
                        </div>
                    );
                } ) }
            </div>
            {/* <button>Add Movie</button> */ }
        </div>
    );
};

export default Movies;
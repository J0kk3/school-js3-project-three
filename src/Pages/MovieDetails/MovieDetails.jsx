//hooks
import { useLocation } from "react-router-dom";
import Card from "../../Components/UI/Card";

const MovieDetails = () =>
{

    const location = useLocation();

    return (
        <div className="divWrapper">
            <Card className="divWrapper__content">
                <p>{ location.state.movie.title }</p>
                <p>{ location.state.movie.shortDescription }</p>
                <p>{ location.state.movie.detailedDescription }</p>
                <p>{ location.state.movie.user }</p>
                <img src={ location.state.movie.imgURL } alt={ location.state.movie.title } />
            </Card>
        </div>
    );
};

export default MovieDetails;
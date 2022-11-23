//components
import Card from "../../Components/UI/Card";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
//styles
import './Start.css';

const Start = () =>
{
    return (
        <div className="divWrapper">
            <h1>React Cinema</h1>
            <Card className="divWrapper__content">
                <Login />
            </Card>
            <Card className="divWrapper__content">
                <Signup />
            </Card>
        </div>
    );
};

export default Start;
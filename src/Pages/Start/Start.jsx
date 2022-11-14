//components
import Card from "../../Components/UI/Card";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Start = () =>
{
    return (
        <Card>
            <div>
                <h1>React Cinema</h1>
                <Login />
                <Signup />
            </div>
        </Card>
    );
};

export default Start;
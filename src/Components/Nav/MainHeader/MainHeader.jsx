//components
import NavLinkComponent from "../NavLinks/NavLinks";
//styles
import classes from  "./Nav.module.css";

const MainHeader = () =>
{
    return (
        <header className={classes.header}>
            <NavLinkComponent />
        </header>
    );
};

export default MainHeader;
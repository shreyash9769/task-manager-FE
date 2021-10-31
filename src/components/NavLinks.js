import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./auth-context";
import classes from "../css/NavLinks.module.css"
const NavLinks = props => {
    const auth = useContext(AuthContext)
    return <div>
        <ul className={classes.nav}>
            <li className={classes.li}>
                <NavLink to="/" exact activeClassName={classes.active}>Home</NavLink>
            </li>

            {auth.isLoggedIn && <li className={classes.li}> <NavLink to={`/tasks/new/${auth.userId}`} activeClassName={classes.active}>Add Task</NavLink></li>}

            {auth.isLoggedIn && <li className={classes.li}> <NavLink to={`/tasks/${auth.userId}`} activeClassName={classes.active}>Your Tasks</NavLink></li>}

            {auth.isLoggedIn && <li className={classes.li}> <NavLink to={`/${auth.userId}/profile`} activeClassName={classes.active}>Profile</NavLink></li>}

            {!auth.isLoggedIn && <li className={classes.li}> <NavLink to="/login" activeClassName={classes.active}>Login</NavLink></li>}

            {auth.isLoggedIn && <li className={classes.li}> <NavLink to="/" onClick={auth.logout}>Logout</NavLink></li>}


            {!auth.isLoggedIn && <li className={classes.li}> <NavLink to="/signup" activeClassName={classes.active}>SignUp</NavLink></li>}

        </ul>
    </div>
}

export default NavLinks
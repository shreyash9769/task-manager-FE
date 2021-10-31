import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./auth-context"
import classes from "../css/WelcomePage.module.css"

const WelcomePage = () => {
    const auth = useContext(AuthContext)

    return <div className={classes.main}>
        <p className={classes.header}>Welcome to Task Manager Application</p>
        <p className={classes.para}>This app eliminates the need to remember yours tasks and allows you to spend more time in completing them</p>
        <p className={classes.what}>What you can do</p>
        <ul className={classes.ul}>
            <li>Add a task</li>
            <li>Edit a task</li>
            <li>Delete a task</li>
            <li>View all your tasks</li>
            <li>Filter tasks by completion status</li>
        </ul>
        <div>
            {!auth.isLoggedIn && <Link to="/login">
                <button className={classes.login}>Login</button>
            </Link>}
            {!auth.isLoggedIn && <Link to="/signup">
                <button className={classes.signup}>Signup</button>
            </Link>}
            {auth.isLoggedIn && <button className={classes.login} onClick={auth.logout}>Logout</button>}
        </div>
    </div>
}

export default WelcomePage
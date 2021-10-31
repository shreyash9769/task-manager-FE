import NavLinks from "./NavLinks"
import classes from "../css/MainNavigation.module.css"
const MainNavigation = () => {
    return <div className={classes.navigation}>
        <p className={classes.header}>Task Manager</p>
        <div className={classes.mainNavigation}>
            <NavLinks></NavLinks>
        </div>
    </div>
}

export default MainNavigation
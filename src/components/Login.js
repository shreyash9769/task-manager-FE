import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./auth-context"
import LoadingSpinner from "./LoadingSpinner"
import ErrorModal from "./ErrorModal"
import { useHttpClient } from "./http-hooks"
import classes from "../css/Login.module.css"
const Login = () => {
    const auth = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const emailChangeHandler = event => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = event => {
        setPassword(event.target.value)
    }
    const submitHandler = async event => {
        event.preventDefault()
        try {
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/login", "POST",
                JSON.stringify({
                    email,
                    password
                }),
                {
                    "Content-Type": "application/json"
                },

            )
            auth.login(responseData.user._id, responseData.token)
        } catch (err) {

        }
    }
    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        <div className={classes.main}>
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <div>
                <form onSubmit={submitHandler} className={classes.form}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" onChange={emailChangeHandler} value={email}></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={passwordChangeHandler} value={password}></input>
                    <button>Login</button>

                </form>
            </div>
            <div className={classes.friend}>
                <h1>Log In</h1>
                <h2>Welcome Back</h2>
                <p>Log In and continue managing your tasks</p>
                <p>Don't have an account?</p>
                <Link to="/signup">
                    <button type="button">Switch to Signup</button>
                </Link>
            </div>
        </div>
    </React.Fragment>
}

export default Login
import React, { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "./auth-context"
import LoadingSpinner from "./LoadingSpinner"
import ErrorModal from "./ErrorModal"
import { useHttpClient } from "./http-hooks";
import ImageUpload from "./ImageUpload"
import classes from "../css/Signup.module.css"
const Signup = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [image, setImage] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    const nameChangeHandler = event => {
        setName(event.target.value)
    }
    const emailChangeHandler = event => {
        setEmail(event.target.value)
    }
    const passwordChangeHandler = event => {
        setPassword(event.target.value)
    }
    const ageChangeHandler = event => {
        setAge(event.target.value)
    }

    // const inputHandler = (value) => {
    //     setImage(value)
    // }

    const inputHandler = useCallback((value) => {
        setImage(value)
    }, []);


    const submitHandler = async event => {
        event.preventDefault();
        try {

            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users", "POST",
                JSON.stringify({
                    name,
                    email,
                    password,
                    age
                }),
                {
                    "Content-Type": "application/json"
                },
            )
            try {
                const formData = new FormData()
                formData.append("avatar", image)
                await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/me/avatar", "POST", formData, {
                    "Authorization": "Bearer " + responseData.token
                })
            } catch (err) {

            }

            auth.login(responseData.user._id, responseData.token)
        } catch (err) {
        }
    }

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        <div className={classes.main}>
            <div>
                {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
                <form onSubmit={submitHandler} className={classes.form}>
                    <ImageUpload onInput={inputHandler}></ImageUpload>
                    <label htmlFor="name">Full Name</label>
                    <input id="name" type="text" onChange={nameChangeHandler} value={name} placeholder="Enter your name"></input>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" onChange={emailChangeHandler} value={email} placeholder="Enter your email"></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" onChange={passwordChangeHandler} value={password} placeholder="Enter your password"></input>
                    <label htmlFor="age">Age</label>
                    <input id="age" type="number" onChange={ageChangeHandler} value={age} placeholder="Enter your age"></input>
                    <button>Signup</button>

                </form>
            </div>
            <div className={classes.friend}>
                <h1>Sign Up</h1>
                <h2>Hello, Friend</h2>
                <p>Enter your personal details and start your journey with us</p>
                <p>Already have an account?</p>
                <Link to="/login">
                    <button>Switch to Login</button>
                </Link>
            </div>
        </div>
    </React.Fragment>
}

export default Signup
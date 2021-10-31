import { useContext, useEffect, useState, useCallback } from "react"
import { useHistory } from "react-router-dom"
import ImageUpload from "./ImageUpload"
import { AuthContext } from "./auth-context"
import { useHttpClient } from "./http-hooks"
import LoadingSpinner from "./LoadingSpinner"
import classes from "../css/EditProfile.module.css"
const EditProfile = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [image, setImage] = useState()

    const nameChangeHandler = event => {
        setName(event.target.value)
    }
    const emailChangeHandler = event => {
        setEmail(event.target.value)
    }
    const ageChangeHandler = event => {
        setAge(event.target.value)
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/me", "GET", null, {
                    "Authorization": "Bearer " + auth.token
                })
                setName(responseData.name)
                setEmail(responseData.email)
                setAge(responseData.age)

            } catch (err) {

            }
        }
        fetchUser()
    }, [sendRequest])

    const inputHandler = useCallback((value) => {
        setImage(value)
    }, []);

    const submitHandler = async event => {
        event.preventDefault()
        if (image) {
            try {
                await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/me/avatar", "DELETE", null, {
                    "Authorization": "Bearer " + auth.token
                })
            } catch (err) {

            }
        }
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/me", "PATCH", JSON.stringify({
                name,
                email,
                age
            }), { "Authorization": "Bearer " + auth.token, "Content-Type": "application/json" })
            if (image) {
                try {
                    const formData = new FormData()
                    formData.append("avatar", image)
                    await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users/me/avatar", "POST", formData, {
                        "Authorization": "Bearer " + auth.token
                    })

                } catch (err) {

                }
            }
        } catch (err) {

        }
        history.push(`/${auth.userId}/profile`)
    }

    const cancelHandler = event => {
        event.preventDefault()
        history.push(`/${auth.userId}/profile`)
    }

    return <div>
        <div className={classes.mainDiv}>
            <p className={classes.header}>Edit Profile</p>
            <div className={classes.main}>
                <div className={classes.image}>
                    <ImageUpload onInput={inputHandler}></ImageUpload>
                </div>
                <div>
                    {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
                    <form onSubmit={submitHandler} className={classes.form}>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" onChange={nameChangeHandler} value={name}></input>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" onChange={emailChangeHandler} value={email}></input>
                        <label htmlFor="age">Age</label>
                        <input id="age" type="number" onChange={ageChangeHandler} value={age}></input>
                        <div>
                            <button type="submit">Save</button>
                            <button type="button" onClick={cancelHandler}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}
export default EditProfile
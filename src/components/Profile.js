import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "./auth-context"
import ErrorModal from "./ErrorModal"
import { useHttpClient } from "./http-hooks"
import LoadingSpinner from "./LoadingSpinner"
import classes from "../css/Profile.module.css"

//"https://res.cloudinary.com/dhqcjbrrk/image/upload/v1635139773/YelpCamp/noprofpic_wr5qzl.png"
const Profile = () => {
    const auth = useContext(AuthContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState("")
    const [src, setSrc] = useState()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const responseData = await sendRequest("http://localhost:5000/users/me", "GET", null, {
    //                 "Authorization": "Bearer " + auth.token
    //             })
    //             const src = `http://localhost:5000/users/${auth.userId}/avatar`
    //             setSrc(src)
    //             setName(responseData.name)
    //             setEmail(responseData.email)
    //             setAge(responseData.age)

    //         } catch (err) {

    //         }
    //     }
    //     fetchUser()
    // }, [sendRequest])

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

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const src = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/users/${auth.userId}/avatar`, "GET", null, {
                    "Authorization": "Bearer " + auth.token
                })
                //console.log(src.imag)
                setSrc(src.imag)
            } catch (err) {

            }
        }
        fetchUser()
    }, [sendRequest])




    return <React.Fragment>
        <div className={classes.main}>
            <ErrorModal error={error} onClear={clearError}></ErrorModal>

            <div className={classes.profile}>
                {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
                <div className={classes.img}>
                    {src && <img src={`data:image/png;base64,${src}`} alt="Profile"></img>}
                    <p className={classes.header}>Profile</p>
                </div>

                <div className={classes.info}>
                    <p className={classes.keys}>Full Name</p>
                    <p className={classes.values}>{name}</p>
                    <p className={classes.keys}>Email</p>
                    <p className={classes.values}>{email}</p>
                    <p className={classes.keys}>Age</p>
                    <p className={classes.values}>{age}</p>
                    <Link to={`/edit/users/${auth.userId}`}>
                        <button>Edit Profile</button>
                    </Link>
                </div>
            </div>
        </div>
    </React.Fragment>
}

export default Profile
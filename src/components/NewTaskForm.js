// import { useState } from "react"
// const NewTaskForm = (props) => {
//     const [enteredTask, setEnteredTask] = useState("")
//     const [enteredStatus, setEnteredStatus] = useState("")
//     const [enteredDescription, setEnteredDescription] = useState("")
//     const [enteredCreatedAt, setEnteredCreatedAt] = useState(new Date())

//     const taskChangeHandler = (event) => {
//         setEnteredTask(event.target.value)
//     }

//     const statusChangeHandler = (event) => {
//         setEnteredStatus(event.target.value)
//     }

//     const descriptionChangeHandler = event => {
//         setEnteredDescription(event.target.value)
//     }

//     const submitHandler = async (event) => {
//         event.preventDefault()
//         const enteredData = {
//             id: "t4",
//             title: enteredTask,
//             description: enteredDescription,
//             status: enteredStatus ? enteredStatus : "Incomplete",
//             createdAt: enteredCreatedAt,
//             owner: "u1"
//         }
//         props.onSaveTaskData(enteredData)
//         setEnteredTask("")
//         setEnteredStatus("")

//     }
//     return <div>
//         <form onSubmit={submitHandler}>
//             <label htmlFor="taskName">Task Name</label>
//             <input onChange={taskChangeHandler} value={enteredTask} id="taskName" type="text"></input>
//             <label htmlFor="description">Task Description</label>
//             <textarea onChange={descriptionChangeHandler} value={enteredDescription} id="description" type="text"></textarea>
//             <label htmlFor="status">Task Status</label>
//             <select onChange={statusChangeHandler} value={enteredStatus} id="status">
//                 <option value="Incomplete">Incomplete</option>
//                 <option value="Completed">Completed</option>
//                 <option value="In Progress">In Progress</option>
//             </select>
//             <button>Add Task</button>
//             <button type="button" onClick={props.onClose}>Cancel</button>
//         </form>
//     </div>
// }

// export default NewTaskForm

import { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { useHttpClient } from "./http-hooks"
import { AuthContext } from "./auth-context"
import ErrorModal from "./ErrorModal"
import LoadingSpinner from "./LoadingSpinner"
import classes from "../css/NewTaskForm.module.css"
const NewTaskForm = (props) => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [enteredTask, setEnteredTask] = useState("")
    const [enteredStatus, setEnteredStatus] = useState("")
    const [enteredDescription, setEnteredDescription] = useState("")

    const taskChangeHandler = (event) => {
        setEnteredTask(event.target.value)
    }

    const statusChangeHandler = (event) => {
        setEnteredStatus(event.target.value)
    }

    const descriptionChangeHandler = event => {
        setEnteredDescription(event.target.value)
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + "/tasks", "POST",
                JSON.stringify({
                    title: enteredTask,
                    description: enteredDescription,
                    status: enteredStatus ? enteredStatus : "Incomplete",
                    owner: auth.userId
                }),
                { "Authorization": "Bearer " + auth.token, "Content-Type": "application/json" }
            )
            history.push(`/tasks/${auth.userId}`)
        } catch (err) {

        }
        // const enteredData = {
        //     id: "t4",
        //     title: enteredTask,
        //     description: enteredDescription,
        //     status: enteredStatus ? enteredStatus : "Incomplete",
        //     createdAt: enteredCreatedAt,
        //     owner: "u1"
        // }
        // props.onSaveTaskData(enteredData)
        setEnteredTask("")
        setEnteredStatus("")
        setEnteredDescription("")
    }
    const closeHandler = event => {
        event.preventDefault()
        history.push(`/tasks/${auth.userId}`)
    }
    return <div>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        <div className={classes.main}>
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <form onSubmit={submitHandler} className={classes.form}>
                <p>Add a new task</p>
                <label className={classes.req} htmlFor="taskName">Task Name</label>
                <input onChange={taskChangeHandler} value={enteredTask} id="taskName" type="text"></input>
                <label className={classes.req} htmlFor="description">Task Description</label>
                <textarea onChange={descriptionChangeHandler} value={enteredDescription} id="description" type="text"></textarea>
                <label htmlFor="status">Task Status</label>
                <select onChange={statusChangeHandler} value={enteredStatus} id="status">
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                </select>
                <label>Task Start Date</label>
                <input type="date"></input>
                <button type="submit">Add Task</button>
                <button type="button" onClick={closeHandler}>Cancel</button>
            </form>
        </div>
    </div>
}

export default NewTaskForm


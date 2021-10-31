import { useState, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
import { AuthContext } from "./auth-context"
import ErrorModal from "./ErrorModal"
import { useHttpClient } from "./http-hooks"
import LoadingSpinner from "./LoadingSpinner"
import classes from "../css/EditTask.module.css"

const EditTask = props => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const tId = useParams().taskId
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [taskName, setTaskName] = useState()
    const [taskDescription, setTaskDescription] = useState()
    const [taskStatus, setTaskStatus] = useState()
    const [task, setTask] = useState()
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/tasks/${tId}`, "GET", null, { "Authorization": "Bearer " + auth.token })

                setTask(responseData)
                setTaskName(responseData.title)
                setTaskDescription(responseData.description)
                setTaskStatus(responseData.status)
            } catch (err) {

            }

        }
        fetchTasks()
    }, [sendRequest, tId])


    const taskNameHandler = event => {
        setTaskName(event.target.value)
    }

    const descriptionChangeHandler = event => {
        setTaskDescription(event.target.value)
    }

    const statusChangeHandler = event => {
        setTaskStatus(event.target.value)
    }

    const submitHandler = async event => {
        event.preventDefault()
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `/tasks/${tId}`, "PATCH", JSON.stringify({
                title: taskName,
                description: taskDescription,
                status: taskStatus
            }), { "Authorization": "Bearer " + auth.token, "Content-Type": "application/json" })
        } catch (err) {

        }
        history.push(`/tasks/${auth.userId}`)

    }

    const onCancelHandler = () => {
        history.push(`/tasks/${auth.userId}`)
    }
    if (isLoading) {
        <LoadingSpinner></LoadingSpinner>
    }

    if (!task && !error) {
        setTimeout(() => {
            return <div>
                Could not find the task
            </div>
        }, 5000)

    }

    return <div>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        <div className={classes.main}>
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            {!isLoading && task && <form onSubmit={submitHandler} className={classes.form}>
                <p>Edit Task</p>
                <label htmlFor="taskName">Task Name</label>
                <input onChange={taskNameHandler} value={taskName} id="taskName" type="text"></input>
                <label htmlFor="description">Task Description</label>
                <textarea onChange={descriptionChangeHandler} value={taskDescription} id="description" type="text"></textarea>
                <label htmlFor="status">Task Status</label>
                <select onChange={statusChangeHandler} value={taskStatus} id="status">
                    <option value="Incomplete">Incomplete</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                </select>
                <button type="submit">Update Task</button>
                <button type="button" onClick={onCancelHandler}>Cancel</button>
            </form>}
        </div>
    </div>
}

export default EditTask
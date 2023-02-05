import React, { useState, useContext, useEffect } from "react"
import { useHttpClient } from "./http-hooks"
import { AuthContext } from "./auth-context"
import FilterByStatus from "./FilterByStatus"
import TaskItem from "./TaskItem"
import LoadingSpinner from "./LoadingSpinner"
import ErrorModal from "./ErrorModal"
import { Link } from "react-router-dom"
import classes from "../css/TaskList.module.css"
const TaskList = props => {
    const auth = useContext(AuthContext)
    const [task, setTask] = useState()
    const [filteredStatus, setFilteredStatus] = useState("All Tasks")
    const { isLoading, error, sendRequest, clearError } = useHttpClient()

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/tasks", "GET", null, { "Authorization": "Bearer " + auth.token })
                const filteredTask = responseData.filter(t => t.status === filteredStatus)
                const data = filteredStatus === "All Tasks" ? responseData : filteredTask

                setTask(data)
            } catch (err) {

            }

        }
        fetchTasks()
    }, [sendRequest, filteredStatus])


    const filterStatusHandler = selectedStatus => {
        setFilteredStatus(selectedStatus)
    }

    const deleteHandler = (taskId) => {
        setTask(prev => prev.filter(t => t._id !== taskId))
    }
    let count = 1

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        <div className={classes.main}>
            {isLoading && <LoadingSpinner asOverlay></LoadingSpinner>}
            <p className={classes.title}>Your Tasks</p>
            <Link to={`/tasks/new/${auth.userId}`}>
                <button className={classes.taskButton}>Add Task</button>
            </Link>
            <FilterByStatus selected={filteredStatus} onFilter={filterStatusHandler}></FilterByStatus>
            {task && !isLoading && task.length !== 0 ?
                task.map(t => <TaskItem count={count++} key={t._id} id={t._id} title={t.title} description={t.description} createdAt={t.createdAt} status={t.status} owner={task.owner} onDeleteTask={deleteHandler}></TaskItem>) :
                filteredStatus === "All Tasks" ? <p className={classes.filTask}>You dont have any tasks</p> : <p className={classes.filTask}>You dont have any {filteredStatus.toLowerCase()} tasks</p>}
        </div>
    </React.Fragment>
}

export default TaskList
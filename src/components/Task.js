// import { Link, useParams } from "react-router-dom"
// const Task = props => {
//     const tId = useParams().taskId
//     const task = props.items.filter(t => t.id === tId)
//     console.log(task)
//     return <div>
//         <p>{task[0].title}</p>
//         <p>{task[0].description}</p>
//         <p>{task[0].status}</p>
//         <p>{task[0].createdAt}</p>
//         <Link to={`/task/${tId}`}>
//             <button>Edit</button>
//         </Link>
//         <button>Delete</button>
//     </div>
// }

// export default Task

import { Link } from "react-router-dom"
import React, { useState, useContext } from "react";
import Modal from "./Modal"
import LoadingSpinner from "./LoadingSpinner"
import ErrorModal from "./ErrorModal"
import { useHttpClient } from "./http-hooks"
import { AuthContext } from "./auth-context"
import classes from "../css/Task.module.css"

const Task = props => {
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttpClient()
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    };

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `/tasks/${props.id}`, "DELETE", null, { "Authorization": "Bearer " + auth.token })
            props.onDelete(props.id)
        } catch (err) {

        }
    };
    return <div>
        <ErrorModal error={error} onClear={clearError}></ErrorModal>
        <Modal
            show={showConfirmModal}
            onCancel={cancelDeleteHandler}
            header="Are you sure?"
            footer={
                <React.Fragment>
                    <button className={classes.cancel} onClick={cancelDeleteHandler}>
                        CANCEL
                    </button>
                    <button className={classes.delete} onClick={confirmDeleteHandler}>
                        DELETE
                    </button>
                </React.Fragment>
            }
        >
            <p>
                Do you want to proceed and delete this task?
            </p>
        </Modal>
        {isLoading && <LoadingSpinner></LoadingSpinner>}
        <div className={classes.main}>
            <div className={classes.task}>
                <p className={classes.p}>Title</p>
                <p className={classes.values}>{props.title}</p>
            </div>
            <div className={classes.task}>
                <p className={classes.p}>Description</p>
                <p className={classes.values}>{props.description}</p>
            </div>
            <div className={classes.task}>
                <p className={classes.p}>Status</p>
                <p className={classes.values}>{props.status}</p>
            </div>
            <div className={classes.task}>
                <p className={classes.p}>Created At</p>
                <p className={classes.values}>{props.createdAt.toString()}</p>
            </div>
            <div className={classes.button}>
                <Link to={`/task/${props.id}`}>
                    <button className={classes.edit}>Edit</button>
                </Link>
                <button onClick={showDeleteWarningHandler} className={classes.delete}>Delete</button>
                <button onClick={props.onClose} className={classes.cancel}>Close</button>
            </div>
        </div>
    </div>
}

// I was getting error when i was adding a task. It was getting displayed
// but when i used to click on it it was showing error -objects are not valid as react child. And that was because
// of some react rule or javascript rule which says that while rendering an object
// react doesnt know how to render it. So what I did was i added toSting() to createdAt property abv
// and everything worked fine. Read more abt it in stackoverflow type the error abv in google

export default Task
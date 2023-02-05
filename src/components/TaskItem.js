import { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import classes from "../css/TaskItem.module.css"
const TaskItem = props => {
    return <div className={classes.main}>
        <div className={classes.title}>
            <p>{props.title}</p>
            <div>
                <FaEdit className={classes.edit}></FaEdit>
                <MdDelete className={classes.delete}></MdDelete>
            </div>
        </div>
        <div className={classes.desc_deadline_wrapper}>
            <p className={classes.desc}>{props.description}</p>
            <p className={classes.deadline}>9 days left</p>
        </div>
        {/* <p>{props.deadline}</p> */}
    </div>
}

export default TaskItem
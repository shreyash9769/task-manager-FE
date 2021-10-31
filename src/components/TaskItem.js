// import { Link } from "react-router-dom"

// const TaskItem = props => {
//     return <div>
//         <Link to={`/${props.owner}/${props.id}`}>
//             <div>
//                 <p>{props.title}</p>
//                 <p>{props.status}</p>
//             </div>
//         </Link>
//     </div>
// }

// export default TaskItem

import { useState } from "react"
import Task from "./Task"
import classes from "../css/TaskItem.module.css"
const TaskItem = props => {
    const [isClicked, setIsClicked] = useState(false)
    const clickedHandler = () => {
        setIsClicked(prev => !prev)
    }
    return <div className={classes.main}>
        {!isClicked && <div className={classes.circle}><p>{props.count}</p></div>}
        {!isClicked && <div onClick={clickedHandler} className={classes.task}>
            <p>{props.title} - {props.status}</p>
        </div>}
        {!isClicked && <div className={classes.stat}>
            <img src={props.status === "Completed" ? process.env.REACT_APP_IMG_SRC1 :
                props.status === "Incomplete" ? process.env.REACT_APP_IMG_SRC2 : process.env.REACT_APP_IMG_SRC3} alt="Status"></img>
        </div>}
        {isClicked && <Task onClose={clickedHandler} id={props.id} title={props.title} description={props.description} createdAt={props.createdAt} status={props.status} onDelete={props.onDeleteTask}></Task>}
    </div>
}

export default TaskItem
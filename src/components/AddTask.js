import { useState } from "react"
import NewTaskForm from "./NewTaskForm"

const AddTask = (props) => {

    const [isEditing, setIsEditing] = useState(false)

    const saveTaskDataHandler = (enteredTaskData) => {
        const enteredTask = {
            ...enteredTaskData
        }

        props.onSaveData(enteredTask)
        setIsEditing(false)
    }

    const addNewTaskHandler = () => {
        setIsEditing(true)
    }

    const closeFormHandler = () => {
        setIsEditing(false)
    }

    return <div>
        {!isEditing && <button onClick={addNewTaskHandler}>Add Task</button>}
        {isEditing && <NewTaskForm onSaveTaskData={saveTaskDataHandler} onClose={closeFormHandler}></NewTaskForm>}
    </div>
}

export default AddTask
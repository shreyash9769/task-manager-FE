import classes from "../css/FilterByStatus.module.css"

const FilterByStatus = props => {
    const filterStatusHandler = (event) => {
        event.preventDefault()
        props.onFilter(event.target.value)
    }
    return <div className={classes.main}>
        <label>Filter By Status</label>
        <select value={props.selected} onChange={filterStatusHandler}>
            <option value="All Tasks">All Tasks</option>
            <option value="Incomplete">Incomplete</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
    </div>
}

export default FilterByStatus
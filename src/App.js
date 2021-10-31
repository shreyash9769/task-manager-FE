import React, { useState, useCallback, useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import { AuthContext } from "./components/auth-context";
import LoadingSpinner from "./components/LoadingSpinner";
//import EditProfile from "./components/EditProfile";
//import EditTask from "./components/EditTask";
//import Login from "./components/Login";
import MainNavigation from "./components/MainNavigation";
//import NewTaskForm from "./components/NewTaskForm";
//import Profile from "./components/Profile";
//import Signup from "./components/Signup";
//import TaskList from "./components/TaskList";
import WelcomePage from "./components/WelcomePage";

const EditProfile = React.lazy(() => import("./components/EditProfile"))
const EditTask = React.lazy(() => import("./components/EditTask"))
const Login = React.lazy(() => import("./components/Login"))
const NewTaskForm = React.lazy(() => import("./components/NewTaskForm"))
const Profile = React.lazy(() => import("./components/Profile"))
const Signup = React.lazy(() => import("./components/Signup"))
const TaskList = React.lazy(() => import("./components/TaskList"))
function App() {
  const [token, setToken] = useState(false)
  const [userId, setUserId] = useState()

  const login = useCallback((userId, token) => {
    setToken(token)
    setUserId(userId)
    localStorage.setItem("userData", JSON.stringify({ userId, token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem("userData")
  }, [])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"))
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token)
    }
  }, [login])

  let routes
  if (token) {
    routes = <Switch>
      <Route path="/" exact>
        <WelcomePage></WelcomePage>
      </Route>
      <Route path="/edit/users/:userId">
        <EditProfile></EditProfile>
      </Route>
      <Route path="/:userId/profile">
        <Profile></Profile>
      </Route>
      <Route path="/tasks/new/:userId">
        <NewTaskForm></NewTaskForm>
      </Route>
      <Route path="/task/:taskId">
        <EditTask></EditTask>
      </Route>
      <Route path="/tasks/:userId">
        <TaskList></TaskList>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  }
  else {
    routes = <Switch>
      <Route path="/" exact>
        <WelcomePage></WelcomePage>
      </Route>
      <Route path="/login" exact>
        <Login></Login>
      </Route>
      <Route path="/signup" exact>
        <Signup></Signup>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  }

  return <AuthContext.Provider value={{ userId: userId, isLoggedIn: !!token, token: token, login: login, logout: logout }}>
    <Router>
      <MainNavigation></MainNavigation>
      <Suspense fallback={<div><LoadingSpinner></LoadingSpinner></div>}>{routes}</Suspense>
      <footer className="foot">
        <p>&copy;2021 Shreyash Adlinge</p>
      </footer>
    </Router>
  </AuthContext.Provider>
}

export default App;

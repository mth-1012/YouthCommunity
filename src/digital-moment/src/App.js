import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import "./assets/styles/customcss.css";
import {Suspense} from "react";
import Login from "./views/auth/Login";
import SignUp from "./views/auth/Signup";
import Home from "./views/Home";
import HomeLocal from "./views/HomeLocal";
import Post from "./views/Post";

function App() {
  return (
    <Suspense>
      <Router>
        <Routes>
          <Route path={"/login"} element={<Login/>}/>
          <Route path={"/signup"} element={<SignUp/>}/>
          <Route path={"/home"} element={<Home/>}/>
          <Route path={"/homelocal"} element={<HomeLocal/>}/>
          <Route path={"/post"} element={<Post/>}/>
          <Route path="*" element={<Navigate to={"/login"}/>}/>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;

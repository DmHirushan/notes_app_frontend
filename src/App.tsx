import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/home.tsx";
import Login from "../pages/Login/login.tsx";
import SignUp from "../pages/SignUp/signup.tsx";


const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default App;

import React, { useContext} from "react";

import { AuthContext } from "../../context/auth";


const HomePage = ()  => {
    const { logout, authenticated } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
    }
    return (
    <>
        <h1>Home Page</ h1> 
        <p>{String(authenticated)}</p>
        <button onClick={handleLogout}>Logout</button>
    </>)
};

export default HomePage;
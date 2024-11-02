import { Outlet } from "react-router-dom";

import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";

const Layout = () => {
    return (
        <Outlet/>? <Outlet/>:<PulseLoader color={"#FFF"} />
    )
}

export default Layout
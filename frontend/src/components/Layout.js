import { Outlet } from "react-router-dom";

import React from 'react'

const Layout = () => {
    return (
        <Outlet/>? <Outlet/>:<PulseLoader color={"#FFF"} />
    )
}

export default Layout
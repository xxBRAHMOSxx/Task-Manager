import { Outlet } from "react-router-dom"
import DashHeader from "./DashHeader"
import DashFooter from "./DashFooter"
import { hideToast } from "../app/toastSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";




const DashLayout = () => {
    const dispatch = useDispatch(); 
    const toast = useSelector((state) => state.toast)
    useEffect(() => { 
        if (toast.visible) { 
            setTimeout(() => { dispatch(hideToast()); }, 3000); // Hide toast after 3 seconds 
            } 
        }, [toast, dispatch]);
     
    return (
        <>  
            <DashHeader />
            <div className="dash-container">
                 <Outlet/>
                {toast.visible && <div className="toast-thapa">{toast.message}</div>}
            </div>
            <DashFooter />
        </>
    )
}

export default DashLayout
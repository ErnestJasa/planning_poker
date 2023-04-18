import { Navigate, Outlet } from "react-router-dom"

const ProtectedGuestRoutes=()=>{
    let guestLoggedInStatus = localStorage.getItem('guest logged in')    
    return(
        guestLoggedInStatus ? <Outlet/> : <Navigate to="/"/>
    )
}
export default ProtectedGuestRoutes
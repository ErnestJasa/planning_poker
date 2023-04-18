import { Navigate, Outlet } from "react-router-dom"

const ProtectedAdminRoutes=()=>{
    let adminLoggedInStatus = localStorage.getItem('admin logged in')    
    return(
        adminLoggedInStatus ? <Outlet/> : <Navigate to="/"/>
    )
}
export default ProtectedAdminRoutes
import { Navigate, Outlet } from "react-router-dom"
import {SignalRContext} from "../context/SignalRProvider";
import {useContext} from "react";

const NotLoggedInRoutes=()=>{
    let adminLoggedInStatus = localStorage.getItem('admin logged in') 
    let guestLoggedInStatus = localStorage.getItem('guest logged in')  

    let access;

    const {generatedRoomId} = useContext(SignalRContext)


     if(!adminLoggedInStatus && !guestLoggedInStatus)
    access=(<Outlet/>)

    else if(adminLoggedInStatus)
    access=(<Navigate to={"/adminlobby/" + generatedRoomId}/>)

    else 
    access=(<Navigate to={"/guestlobby/" + generatedRoomId}/>)

    return(    
        access
    )
}
export default NotLoggedInRoutes
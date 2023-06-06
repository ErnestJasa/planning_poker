import {  useContext } from "react";
import {  Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import {SignalRContext} from "../context/SignalRProvider";
import ApiUrl from "../api/ApiUrl";

const LOGOUT_URL = ApiUrl+'/api/User/logout'

const Header=({user})=>{
    let logToggle;
      
    const { setAuth } = useContext(AuthContext);
    const {closeConnection} = useContext(SignalRContext)

    let username;

    if (user != undefined)
    {
        localStorage.setItem('username', (user));
    }

    let adminLoggedInStatus = localStorage.getItem('admin logged in')
    let guestLoggedInStatus = localStorage.getItem('guest logged in')
   
    const logout = async ()=>{
        fetch(LOGOUT_URL,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'     
        })
            .then(result=> result.json())
            setAuth({});

            username=null;
            localStorage.removeItem('admin logged in')
            localStorage.removeItem('guest logged in')
            localStorage.removeItem('username')
            closeConnection();
    }

if(adminLoggedInStatus != null || guestLoggedInStatus != null){
        username=localStorage.getItem('username')
        logToggle=(
            <div className="col-6 row justify-content-end">   
                <div className="col-6" align="right">
                    <span id="head-username">                 
                    {username}
                    </span>
                </div>
                <div className="col-2" align="left">
                    <Link id='logout-btn' to="/" className="nav-link active" onClick={logout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill mb-1" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    <span> Logout</span>
                    </Link>
                </div>                
            </div>
        )
    }          
    else {      
           
        logToggle=(
            <div className="col-6 row justify-content-end">   
                <div className="col-6" align="right">
                    <span>
                        
                    </span>
                </div>
                <div className="col-2" align="left">
                    <Link id='link-to-login' to="/adminlogin" className="nav-link active">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill mb-1" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    </svg>
                    <span> Login</span>
                    </Link>
                </div>                
            </div>
        )
}
    return(
        <div className="container-fluid">
        <nav className="header navbar fixed-top row">
            <div className="col-3">
                <span className="navbar-brand h1 ms-4">Festo Scrum Poker</span>                
            </div>
            {logToggle}
            <div className="col-2" align="center">
                <a id='link-to-festo' href="https://www.festo.com">
            <img id='img-festo' src="https://www.festo.com/media/fox/frontend/img/svg/logo_blue.svg" alt="Festo icon" width="120px" align="center" />
                </a>
            </div>
        </nav>    
        </div>
    )
    }

export default Header;
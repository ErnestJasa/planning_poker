import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import {useNavigate, Link, useParams} from "react-router-dom";
import ApiUrl from "../api/ApiUrl";
import {SignalRContext} from "../context/SignalRProvider";

 const LOGIN_URL = ApiUrl+'/api/User/login'
 const USER_URL = ApiUrl+'/api/User/user'

const AdminLogin=props=>{
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSucces] = useState(false);
    const [user, setUser] = useState({})
    const {roomId} = useParams()

    const navigate = useNavigate();

    const {generateRoomIdAndSendEmail, setRoomId} = useContext(SignalRContext)

    useEffect(()=>{
        setRoomId(roomId)
    },[roomId])

    useEffect(()=>{
        setErrMsg('');
    }, [email, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            );
            const accessToken = response?.data?.accessToken;
            
            setAuth({email, password, accessToken})
            setEmail('');
            setPassword('');
            setSucces(true);
            localStorage.setItem('admin logged in', 'true')
            if(roomId === undefined){
                generateRoomIdAndSendEmail(email)
            }else{
                setRoomId(roomId)
            }
            
            const nameresponse = await axios.get(USER_URL,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                });                     
                    const content = nameresponse?.data

                    setUser(content)
                    props.onChange(content) 
                    props.onSubmit(content)
                    localStorage.setItem("username",content.name)
        }catch(err){
            if(!err?.response) {
                setErrMsg('No server response');
            }else if (err.response?.status === 400){
                setErrMsg(                 
                    <div className="alert alert-danger d-flex align-items-center" role="alert"> 
                        <div>
                            You have provided invalid credentials 
                        </div>
                    </div>                                   
                    );
            }else if (err.response?.status === 401){
                setErrMsg("Unauthorized");
            }else{
                setErrMsg("Login failed");
            }
            // errRef.current.focus();
        }     
    }

    return(
        <>        
        {                         
                <section className="guest-login container-fluid row justify-content-center align-items-center">
                <div className="letsStart col-5 ">
                    <h1 className="text-center">Welcome back</h1>
                    <h5 className="text-center">Login with your account:</h5>
                    <br/>                  
                        <form onSubmit={handleSubmit}>                            
                            <div className="input-group">
                                <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 my-1 bi bi-envelope" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                </svg>
                                </span>                                
                                <input                       
                                    className="form-control"          type="email"
                                    placeholder="Enter your email"             
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required>                
                                </input>
                            </div>
                            <br/>
                            <div className="input-group">
                                <span className="input-group-text">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mx-1 my-1 bi bi-lock" viewBox="0 0 16 16">
                                     <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                </svg>
                                </span>                                
                                <input                       
                                    className="form-control"
                                    type="password"
                                    placeholder="Enter your password"               
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required>                
                                </input>
                            </div>
                            <br/>
                            <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"}  aria-live="assertive"  >  
                                   {errMsg}
                                
                            </div>    
                            <br/>
                            <button className="form-control btn btn-primary">
                                Login
                            </button>   
                            <br/>                  
                        </form>                              
                    </div>                
                </section>
            }
            </>
    )  
}

export default AdminLogin;

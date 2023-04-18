import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/header";
import Footer from './components/footer';
import './App.css';
import GuestLogin from './pages/guestlogin';
import GuestLobby from './pages/guestlobby';
import AdminLogin from './pages/adminlogin';
import AdminLobby from './pages/adminlobby';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useState} from 'react';
import NotLoggedInRoutes from './utils/notloggedinroutes';
import ProtectedAdminRoutes from './utils/protectedadminroutes';
import ProtectedGuestRoutes from './utils/protectedguestroutes';
import {SignalRProvider} from "./context/SignalRProvider";
import NotificationSnackbar from "./notificationSnackbar/NotificationSnackbar";

function App() {
    const [userData, setUserData] = useState({})

    return (
        <>
            <Router>
                <SignalRProvider>
                    <Header user={userData.name} />
                    <main className="main container-fluid">
                        <Routes>

                            <Route element={<NotLoggedInRoutes/>}>
                                <Route path="/:roomId" element={<GuestLogin onChange={content => setUserData(content)}/>}/>
                                <Route path="/adminlogin/:roomId?" element={<AdminLogin onChange={content => setUserData(content)}/>}/>
                            </Route>

                            <Route element={<ProtectedAdminRoutes/>}>
                                <Route path="/adminlobby/:roomId" element={<AdminLobby/>}/>
                            </Route>

                            <Route element={<ProtectedGuestRoutes/>}>
                                <Route path='/guestlobby/:roomId' element={<GuestLobby/>}/>
                            </Route>

                            <Route path='*' element={<h1 className='text-center'>Please use specific room link or login as a Moderator.</h1>}/>
                        </Routes>
                    </main>
                    <NotificationSnackbar/>
                </SignalRProvider>
                <Footer/>
            </Router>
        </>
    );
}

export default App;

import React, {useEffect, useState, useContext} from 'react';
import {SignalRContext} from "../context/SignalRProvider";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ApiUrl from "../api/ApiUrl";

const NotificationSnackbar = () => {
    const [message, setMessage] = useState()

    const {votesCleared, votingFinished, notification, setVotingFinished, setVotesCleared, setNotification} = useContext(SignalRContext)

    useEffect(()=>{
        fetch(ApiUrl+`/api/NotificationMessage/getNotificationById/1`)
            .then(response=> response.json())
            .then(data=> setMessage(data.message))
    },[])



    useEffect(()=>{
        if(votingFinished || votesCleared){
            if(message !== ''){
                toast.info(message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                    theme: "light",
                    pauseOnFocusLoss: false,
                    delay: 1000,
                    onOpen:()=>{
                        setVotingFinished(false)
                        setVotesCleared(false)
                    }
                });
            }
        }
    },[votingFinished, votesCleared])


    useEffect(()=>{
        if(notification){
            toast.info(notification, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: false,
                theme: "light",
                pauseOnFocusLoss: false,
                onClose: ()=>{
                    setNotification()
                }
            });
        }
    },[notification])



    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
        </>
    );
};

export default NotificationSnackbar;
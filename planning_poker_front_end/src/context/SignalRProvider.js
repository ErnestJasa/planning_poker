import React, {createContext, useEffect, useState} from 'react';
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import ApiUrl from "../api/ApiUrl";
import axios from 'axios';

export const SignalRContext = createContext(undefined)

const ROOM_CARD_CONFIG_GET = ApiUrl+'/api/RoomCardConfig/'
const ROOM_CARD_CONFIG_POST = ApiUrl+'/api/RoomCardConfig'


export const SignalRProvider = ({children}) => {
    const [users, setUsers] = useState([])
    const [connection, setConnection] = useState()
    const [flipCards, setFlipCards] = useState(false)
    const [everyoneVoted, setEveryoneVoted] = useState(false)
    const [votesCleared, setVotesCleared] = useState(false)
    const [votingFinished, setVotingFinished] = useState(false)
    const [notification, setNotification] = useState()
    const [result, setResult]=useState({})
    const [generatedRoomId, setGeneratedRoomId] = useState('')

    const [items, setItems] = useState([
        { id: 1, name: '0', checked: false },
        { id: 2, name: '1/2', checked: false },
        { id: 3, name: '1', checked: true },
        { id: 4, name: '2', checked: true },
        { id: 5, name: '3', checked: true },
        { id: 6, name: '5', checked: true },
        { id: 7, name: '8', checked: true },
        { id: 8, name: '13', checked: false },
        { id: 9, name: '20', checked: false },
        { id: 10, name: '40', checked: false },
        { id: 11, name: '100', checked: false },
        { id: 12, name: '?', checked: false },
        { id: 13, name: 'Coffee', checked: false },
      ]); 

    const newConnection = new HubConnectionBuilder()
        .withUrl(ApiUrl+'/lobby')
        .configureLogging(LogLevel.Information)
        .build()

    const joinRoom = async ()=>{
        try{
            newConnection.onclose(e=>{
                setConnection()
                setUsers([])
                setEveryoneVoted(false)
            })

            await newConnection.start();
            if (localStorage.getItem("admin logged in")){
                await newConnection.invoke("JoinRoom", {username: localStorage.getItem('username'), room: generatedRoomId, role: 'admin', vote: "?", voted: false})
            }
            else if(localStorage.getItem("guest logged in")){
                await newConnection.invoke("JoinRoom", {username: localStorage.getItem('username'), room: generatedRoomId, role: 'guest', vote: "?", voted: false})
            }
            await setConnection(newConnection)

            axios.get(ROOM_CARD_CONFIG_GET+generatedRoomId)
            .then(res => {
                const data = JSON.parse(res.data.value)
                setItems(data)
                localStorage.setItem('cardConfig', res.data.value);
            })
            .catch(axios.post(ROOM_CARD_CONFIG_POST,{configRoom:generatedRoomId, value:JSON.stringify(items)}),
            localStorage.setItem('cardConfig', JSON.stringify(items)))
        }catch (e){
            console.log(e)
        }
    }

    useEffect(()=>{
        if (localStorage.getItem("admin logged in") || localStorage.getItem("guest logged in")){
            joinRoom();
        }
    },[localStorage.getItem("admin logged in"), localStorage.getItem("guest logged in"), generatedRoomId])

    const closeConnection = async ()=>{
        await connection.stop()
    }
    newConnection.on("UsersInRoom", (users)=>{
        setUsers(users)
    })
    newConnection.on("EveryoneVoted", (voted, notification)=>{
        setEveryoneVoted(voted)
        if(voted){
            setNotification(notification)
        }
    })
    newConnection.on("VotesCleared", (cleared, notification)=>{
        setVotesCleared(cleared)
        if(cleared){
            setNotification(notification)
        }
    })
    newConnection.on("VotingFinished", (votingFinished, notification)=>{
        setVotingFinished(votingFinished)
        if(votingFinished){
            setNotification(notification)
        }
    })
    newConnection.on("CardsFlipped", (flipCards, notification)=>{
        setFlipCards(flipCards)
        if(flipCards){
            setNotification(notification)
        }
    })
    newConnection.on("CardConfigNotification", (votesCleared,notification)=>{
        setNotification(notification)
    })
    const sendVote = async (vote) =>{
        await connection.invoke("UpdateVote", localStorage.getItem('username'), vote, true, generatedRoomId)
        await connection.invoke("CheckIfEveryoneVoted", generatedRoomId)
    }

    const handleFlipCards = async ()=>{
        await connection.invoke("FlipCards",true, generatedRoomId)
    }

    const handleFinishVoting = async ()=>{
        await connection.invoke("FinishVoting", generatedRoomId)
        await connection.invoke("FlipCards",false, generatedRoomId)
        await connection.invoke("CheckIfEveryoneVoted", generatedRoomId)
    }

    const clearVotes =async ()=>{
        await connection.invoke("FlipCards",false, generatedRoomId)
        await connection.invoke("ClearVotes", generatedRoomId)

        await connection.invoke("CheckIfEveryoneVoted", generatedRoomId)
    }

    const handleCardConfigChange = async ()=>{
        await connection.invoke("CardConfigurationNotification", generatedRoomId)
        await connection.invoke("CheckIfEveryoneVoted", generatedRoomId)
    }

    const handleResults=(connectedUsers)=>{
        const guests = connectedUsers.filter(player => player.role === 'guest');

        const voteCount = {};

        for (const { vote } of guests) {
            if (voteCount[vote]) {
              voteCount[vote]++;
            } else {
              voteCount[vote] = 1;
            }
          }

          const voteStats = [];

          for (const [vote, count] of Object.entries(voteCount)) {
            voteStats.push({
              vote,
              count,
              percentage: (count / guests.length) * 100,
            });
          }
          
          setResult(voteStats)
    }

    const generateRoomIdAndSendEmail = (email) => {
        const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomString = "";
        for (let i = 0; i < 5; i++) {
            randomString += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        setGeneratedRoomId(randomString)
        sendEmail(email, randomString)
    };


    const setRoomId = (roomId)=>{
        setGeneratedRoomId(roomId)
    }

    const sendEmail = (email, roomId)=>{
        const baseUrl = window.location.host
        const link =  baseUrl +'/' + roomId
        fetch(ApiUrl + `/api/EmailSender/`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email, link}),
            withCredentials: true
        })
            .catch(e=>{
                console.log(e)
            })
    }

    return (
        <SignalRContext.Provider value={{
                clearVotes, sendVote, handleFlipCards, handleFinishVoting,
                closeConnection, handleCardConfigChange, setNotification,setVotingFinished,
                setVotesCleared,notification, everyoneVoted, flipCards, users,
                votesCleared, votingFinished, handleResults, result, generateRoomIdAndSendEmail, generatedRoomId, setRoomId}}>
            {children}
        </SignalRContext.Provider>
    );
};


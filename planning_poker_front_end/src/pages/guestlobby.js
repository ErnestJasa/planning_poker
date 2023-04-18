import ConnectedUsers from "../components/ConnectedUsers";
import VotingArea from "../components/votingarea";
import VotingConfiguration from "../components/votingconfiguration";
import {useContext, useEffect, useState} from "react";
import {SignalRContext} from "../context/SignalRProvider";
import {useParams} from "react-router-dom";

const GuestLobby=()=>{
    const [vote, setVote] = useState('')

    const {sendVote, setRoomId} = useContext(SignalRContext)
    const {roomId} = useParams()

    useEffect(()=>{
        setRoomId(roomId)
    },[roomId])

    const handleVote = (vote)=>{
        setVote(vote)
    }
    useEffect(()=>{
        sendVote(vote)
    },[vote])

    return(
        <section className="lobby mt-3 container-fluid row justify-content-center align-items-center">
            <div className="col-6">
                <div className="lobby-element voting-area ">
                    <VotingArea sendVote={handleVote}/>
                </div>
            </div>
            <ConnectedUsers/>
        </section>
    )
}

export default GuestLobby;
import VotingConfiguration from "../components/votingconfiguration";
import ConnectedUsers from "../components/ConnectedUsers";
import AdminVotingArea from "../components/adminVotingArea";
import { useContext, useState, useEffect } from "react";
import {SignalRContext} from "../context/SignalRProvider";
import {useParams} from "react-router-dom";


const AdminLobby=({})=>{
    const {clearVotes, handleFlipCards, handleFinishVoting, setRoomId} = useContext(SignalRContext)
    const {roomId} = useParams()

    useEffect(()=>{
        setRoomId(roomId)
    },[roomId])

    return(
        <section className="mt-3  row justify-content-center align-items-center">
            <div className="voting col-7">
                <div className="lobby-element voting-area ">
                     <AdminVotingArea/>
                </div>
                <div className="lobby-element voting-controls">
                    <div className="row  d-flex justify-content-center align-items-center" style={{width:'100%'}}>
                        <button id='configure-cards-btn' type="button" className=" w-25 btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Voting configuration</button>
                        <VotingConfiguration/>
                    </div>
                    <div className="row mx-1 mt-2 d-flex justify-content-evenly" style={{width:'100%'}}>
                        <button onClick={clearVotes} id='clear-votes-btn'  className=" col-3 btn btn-outline-primary">Clear Votes</button>
                        <button onClick={handleFlipCards} id='flip-cards-btn' className=" col-3 btn btn-outline-primary">Flip Cards</button>
                        <button onClick={handleFinishVoting} id='finish-voting-btn'  className=" col-3 btn btn-primary">Finish Voting</button>
                    </div>
                </div>
            </div>
            <ConnectedUsers/>
        </section>
    )
}

export default AdminLobby;
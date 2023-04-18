import React, {useContext, useEffect, useState} from 'react';
import {RiAdminFill} from 'react-icons/ri'
import {FaUserAlt} from 'react-icons/fa'
import {BsCheckCircle} from 'react-icons/bs'
import {SignalRContext} from "../context/SignalRProvider";
import ApiUrl from "../api/ApiUrl";

const ConnectedUsers = () => {
    const [connectedUsers, setConnectedUsers] = useState([])
    const [displayVotes, setDisplayVotes] = useState(false)
    const [allVoted, setAllVoted] = useState(false)
    const adminList = [];
    const guestList = []

    const {flipCards, everyoneVoted, users, handleResults, generatedRoomId} = useContext(SignalRContext)

    useEffect(()=>{
        setDisplayVotes(flipCards)
    },[flipCards])
    useEffect(()=>{
        setAllVoted(everyoneVoted)
    },[everyoneVoted])

    useEffect(()=>{
         //fetch(ApiUrl+'/api/ConnectedUser/connectedUsers')
        fetch(ApiUrl + '/api/room/' + generatedRoomId)
            .then(response => response.json())
            //.then(data => setConnectedUsers(data))
            .then(data => setConnectedUsers(data.connectedUsers))
    },[users, generatedRoomId])

    useEffect(()=>{
        if(connectedUsers !== undefined){
            handleResults(connectedUsers)
        }
    },[connectedUsers])

    connectedUsers?.map((user)=>{
        if(user.role ==='admin'){
            adminList.push(user)
        }else if(user.role ==='guest'){
            guestList.push(user)
        }
    })

    const returnVotingStatus=()=>{
        if(displayVotes || allVoted){
             return("Waiting for moderator to finalise vote"
                )
        }else{
            return("Waiting for "+guestList.length+" players to vote")
        }  
    }

    const returnUserList = ()=>{
        if(!displayVotes && !allVoted){
            if(guestList.length !== 0){
                return (
                    <div>
                        {guestList ?
                            <>
                                {guestList?.map((user, id)=>(
                                    <h6 id='player-name' data-toggle="Tooltip" title='Player' className='mx-2 mt-3 cursor-default' key={id}>
                                        <FaUserAlt opacity='80%' size='17px'/> {user.username} {user.voted ? <BsCheckCircle id='voted-checkmark' data-toggle="Tooltip" title='Voted' color='green' size='15px'/> : ""}
                                    </h6>
                                ))}
                            </> :
                            ""
                        }
                    </div>
                )
            }
        }
        else if(displayVotes || allVoted){
            return( <div>
                    {guestList?.map((user, id)=>(
                        <h6 id='player-name' data-toggle="Tooltip" title='Player' className='mx-2 mt-3 cursor-default' key={id}>
                            <FaUserAlt opacity='80%' size='17px'/> {user.username} <span id='vote-value' data-toggle="Toggle" title='Vote' className='float-end'>{user.vote}</span>
                        </h6>
                    ))}
                </div>
            )
        }
    }

    return (
        <div className="lobby-element player-list col-2 align-self-start">
            <h5 className="text-center bg-primary  p-3 connected-users-title cursor-default">
            {returnVotingStatus()}
            </h5>
            <div className='mt-3'>
                {adminList.length !== 0 ?
                    <div>
                        {adminList?.map((user, id)=>(
                            <h6 id='moderator-name' data-toggle="Tooltip" title='Moderator' className='mx-2 mt-3 green cursor-default' key={id}>
                                <RiAdminFill size='19px'/> {user.username}
                            </h6>
                        ))}
                        <div className='pt-2 border-bottom'></div>
                    </div> : ''}
                {returnUserList()}
            </div>
        </div>
    );
};

export default ConnectedUsers;
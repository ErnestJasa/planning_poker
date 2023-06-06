import { useState, useEffect, useContext } from "react"
import axios from 'axios';
import ApiUrl from "../api/ApiUrl";
import {SignalRContext} from "../context/SignalRProvider";
import DoughnutChart from "./doughnutChart";

const ROOM_CONFIG_GET_URL = ApiUrl+'/api/RoomCardConfig/'

const VotingArea=({sendVote})=> {
    const [vote, setVote] = useState('')
    const [displayVotes, setDisplayVotes] = useState(false)
    const [allVoted, setAllVoted] = useState(false)
    const [clickedId, setClickedId] = useState(null);
    const [data, setData] = useState([]);

    const {flipCards, everyoneVoted, result, generatedRoomId, notification, votesCleared, votingFinished} = useContext(SignalRContext)

    let config = JSON.parse(localStorage.getItem('cardConfig'))
    const [items, setItems]=useState(config)
    let renderedCards
    const numItemsPerRow = 5; 
    const itemWidth = 100 / numItemsPerRow;  

    useEffect(()=>{
        setDisplayVotes(flipCards)
    },[flipCards])
    useEffect(()=>{
        setAllVoted(everyoneVoted)
    },[everyoneVoted])
    useEffect(()=>{
        sendVote(vote)
    },[vote])
    useEffect(() => {
        axios.get(ROOM_CONFIG_GET_URL+generatedRoomId)
        .then(res => {
            localStorage.setItem('cardConfig', res.data.value);
            config = JSON.parse(localStorage.getItem('cardConfig'))
            setItems(config)
        })
    }, [notification])
    useEffect(() => {
          if(votesCleared || votingFinished){
              setClickedId('')
              setVote(null)
          }
    }, [votesCleared, votingFinished])

const handleClick = (id, e) => {
  setClickedId(id);
  setVote(e.target.value)
  console.log(e.target.value)
};
    useEffect(()=>{
      setData(result)
  },[result])

if(displayVotes||allVoted){
    return(
      renderedCards=( 
            <DoughnutChart data={data}/>)
    )}else{
if(items!=null){
  renderedCards=(
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', height: '100%' }} className="container-fluid justify-content-center align-items-center" >
       {items.map(item => {
         if (item.checked) 
         {
          return(
             <div key={item.id}    className="cursor-pointer col-1.5 btn d-flex justify-content-center" align="center" style={{height:'30%', width: `${itemWidth}%`}}>
                <button value={item.name}  className={item.id === clickedId ? 'clicked' : 'card-style'}  onClick={(e) => handleClick(item.id, e)} >
                  <h5>{item.name}</h5>
                </button>
             </div>
           );
         } else {
          return null;
         }
       })}
     </div>
  )
}else{
  renderedCards=(
    <div>No cards selected</div>
  )
}}
    return (
      <div className="container-fluid">        
          {renderedCards}       
      </div>
      );
}
export default VotingArea;
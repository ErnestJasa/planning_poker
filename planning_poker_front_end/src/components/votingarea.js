import { useState, useEffect, useContext } from "react"
import axios from 'axios';
import ApiUrl from "../api/ApiUrl";
import {SignalRContext} from "../context/SignalRProvider";
import DoughnutChart from "./doughnutChart";

//const CONFIG_GET_URL = 'https://bedarbiai-app-windows.azurewebsites.net/api/CardConfig/get'
const CONFIG_GET_URL = ApiUrl+'/api/CardConfig/get'
const CLEAR_PUT_URL = ApiUrl+'/api/CardClear/put'
const CLEAR_GET_URL = ApiUrl+'/api/CardClear/get'

const ROOM_CARD_CLEAR_GET_URL = ApiUrl+'/api/RoomCardClear/'
const ROOM_CARD_CLEAR_PUT_URL = ApiUrl+'/api/RoomCardClear/put'

const ROOM_CONFIG_GET_URL = ApiUrl+'/api/RoomCardConfig/'

const VotingArea=({sendVote})=> {
    const [vote, setVote] = useState('')
    const [displayVotes, setDisplayVotes] = useState(false)
    const [allVoted, setAllVoted] = useState(false)

    const {flipCards, everyoneVoted, result, generatedRoomId} = useContext(SignalRContext)

    useEffect(()=>{
        setDisplayVotes(flipCards)
    },[flipCards])
    useEffect(()=>{
        setAllVoted(everyoneVoted)
    },[everyoneVoted])


    const handleVote = (e)=>{
        setVote(e.target.value)
        console.log(e.target.value)
    }

    let config = JSON.parse(localStorage.getItem('cardConfig'))
    const [items, setItems]=useState(config)
    let renderedCards

    useEffect(()=>{
        sendVote(vote)
    },[vote])

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     axios.get(CONFIG_GET_URL)
    //     .then(res => {
    //       localStorage.setItem('cardConfig', res.data[0].value);
    //       config = JSON.parse(localStorage.getItem('cardConfig'))
    //       setItems(config)
    //     })
    //     .catch(err => console.log(err));
    //   }, 1000);
    //   return () => clearInterval(interval);
    // }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        axios.get(ROOM_CONFIG_GET_URL+generatedRoomId)
        .then(res => {
          localStorage.setItem('cardConfig', res.data.value);
          config = JSON.parse(localStorage.getItem('cardConfig'))
          setItems(config)
        })
        .catch(err => console.log(err));
      }, 1000);
      return () => clearInterval(interval);
    }, [])


    const [clickedId, setClickedId] = useState(null);

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     axios.get(CLEAR_GET_URL)
    //     .then(res => {
    //       if(res.data[0].clear===true){            
    //           setClickedId('')
    //           setVote(null)
    //       }
    //     })
    //     .catch(err => console.log(err));
    //   }, 1000);
    //   return () => clearInterval(interval);     
    // }, [])

    useEffect(() => {
      const interval = setInterval(() => {
        axios.get(ROOM_CARD_CLEAR_GET_URL+generatedRoomId)
        .then(res => {
          if(res.data.roomClear===true){            
              setClickedId('')
              setVote(null)
          }
        })
        .catch(err => console.log(err));
      }, 1000);
      return () => clearInterval(interval);     
    }, [])

const handleClick = (id, e) => {
  setClickedId(id);
  setVote(e.target.value)
  axios.put(ROOM_CARD_CLEAR_PUT_URL, {clearRoom:generatedRoomId, roomClear:false})
  console.log(e.target.value)
 // handleVote(e)
};

const [data, setData] = useState([]);

    useEffect(()=>{
      setData(result)
  },[result])


  const numItemsPerRow = 5; 
  const itemWidth = 100 / numItemsPerRow;  

if(displayVotes||allVoted){
  // console.log(result)
  // console.log(displayVotes)
  // console.log(allVoted)
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
             <div key={item.id}    className="cursor-pointer col-1.5 btn" align="center" style={{height:'30%', width: `${itemWidth}%`}}>
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
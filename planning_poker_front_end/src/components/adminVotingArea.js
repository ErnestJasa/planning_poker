import axios from 'axios';
import ApiUrl from "../api/ApiUrl";
import {useContext, useState, useEffect} from "react";
import {SignalRContext} from "../context/SignalRProvider";
import DoughnutChart from './doughnutChart';

const ROOM_CONFIG_GET_URL = ApiUrl+'/api/RoomCardConfig/'

const AdminVotingArea=()=> {
    const [displayVotes, setDisplayVotes] = useState(false)
    const [allVoted, setAllVoted] = useState(false)
    const [data, setData] = useState([]);
    const {flipCards, everyoneVoted, result, generatedRoomId, notification } = useContext(SignalRContext)
    
    let config = JSON.parse(localStorage.getItem('cardConfig'))
    const [items, setItems]=useState(config)
    const numItemsPerRow = 5; 
    const itemWidth = 100 / numItemsPerRow;  
    let renderedCards

    useEffect(()=>{
        setDisplayVotes(flipCards)
    },[flipCards])
    useEffect(()=>{
        setAllVoted(everyoneVoted)
    },[everyoneVoted])
    useEffect(() => {
        axios.get(ROOM_CONFIG_GET_URL+generatedRoomId)
        .then(res => {
          localStorage.setItem('cardConfig', res.data.value);
          config = JSON.parse(localStorage.getItem('cardConfig'))
          setItems(config)
        })
    }, [notification])
    useEffect(()=>{
      setData(result)
  },[result])

if(displayVotes||allVoted){
    return(
      renderedCards=(
        <DoughnutChart data={data}/>
      )
    )}else{
if(items!=null){
  renderedCards=(
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', height: '100%' }} className="container-fluid justify-content-center align-items-center" >
       {items.map(item => {
         if (item.checked) 
         {
          return(
            <div key={item.id}    className="col-1.5 btn  disabled-card d-flex justify-content-center" align="center" style={{height:'30%', width: `${itemWidth}%`}}>
                <div className="card-style" >
                    <h5>{item.name}</h5>
                </div>
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
}
    }return (
      <div className="container-fluid">        
          {renderedCards}       
      </div>
      );
}
export default AdminVotingArea;
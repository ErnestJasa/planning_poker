import { useState, useContext } from "react";
import axios from "../api/axios";
import ApiUrl from "../api/ApiUrl";
import {SignalRContext} from "../context/SignalRProvider";
// import {useParams} from "react-router-dom";


//const CONFIG_PUT_URL = 'https://bedarbiai-app-windows.azurewebsites.net/api/CardConfig/put'

 const CONFIG_PUT_URL = ApiUrl+'/api/CardConfig/put'
 const ROOM_CARD_CLEAR_POST_URL = ApiUrl+'/api/RoomCardClear'
 const ROOM_CONFIG_PUT_URL = ApiUrl+'/api/RoomCardConfig/put'

const VotingConfiguration=props=> {
  // console.log('configas is storago '+localStorage.getItem('cardConfig'))
  let config = JSON.parse(localStorage.getItem('cardConfig'))
  // if(config!=null){console.log(config[0])}else{console.log('no config')}

  const {handleCardConfigChange, generatedRoomId} = useContext(SignalRContext)
  // const {roomId} = useParams()

  // axios.post(ROOM_CARD_CLEAR_POST_URL, {clearRoom:roomId, roomClear: false})
  // console.log('roomclear posted?')

  const [items, setItems] = useState(config? config : [
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
 
  const [useAll, setUseAll]=useState(false)
  
  const handleUseAll=()=>{
    setUseAll(!useAll);
    if(useAll==true){
      setItems([
    { id: 1, name: '0', checked: false },
    { id: 2, name: '1/2', checked: false },
    { id: 3, name: '1', checked: false },
    { id: 4, name: '2', checked: false },
    { id: 5, name: '3', checked: false },
    { id: 6, name: '5', checked: false },
    { id: 7, name: '8', checked: false },
    { id: 8, name: '13', checked: false },
    { id: 9, name: '20', checked: false },
    { id: 10, name: '40', checked: false },
    { id: 11, name: '100', checked: false },
    { id: 12, name: '?', checked: false },
    { id: 13, name: 'Coffee', checked: false },
      ])
    }else{
      setItems([
    { id: 1, name: '0', checked: true },
    { id: 2, name: '1/2', checked: true },
    { id: 3, name: '1', checked: true },
    { id: 4, name: '2', checked: true },
    { id: 5, name: '3', checked: true },
    { id: 6, name: '5', checked: true },
    { id: 7, name: '8', checked: true },
    { id: 8, name: '13', checked: true },
    { id: 9, name: '20', checked: true },
    { id: 10, name: '40', checked: true },
    { id: 11, name: '100', checked: true },
    { id: 12, name: '?', checked: true },
    { id: 13, name: 'Coffee', checked: true },
      ])
    }
  }
    const handleCheckboxChange = (event, itemId) => {
      setUseAll(false)
      setItems(prevItems => {
        const itemIndex = prevItems.findIndex(item => item.id === itemId);
        const updatedItem = { ...prevItems[itemIndex], checked: event.target.checked };
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = updatedItem;
        return updatedItems;  
      }); 
    }; 
const SaveBtn=()=>{
  axios.put(CONFIG_PUT_URL, {id:1, value: JSON.stringify(items)})
  axios.put(ROOM_CONFIG_PUT_URL, {configRoom:generatedRoomId, value:JSON.stringify(items)})
  handleCardConfigChange()
}
const CancelBtn=()=>{ 
  setItems(config)
  setUseAll(false)
}

return(
  <div>
<div className="voting-config modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"  aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div className="modal-dialog">
<div className="modal-content">
<div className="modal-header">
  <h1 className="modal-title fs-5" id="staticBackdropLabel">
  <div className="form-check">
    <label className="form-check-label">
      <input className="form-check-input" type="checkbox" checked={useAll} onChange={handleUseAll} value="" id="flexCheckDefault"/>    
      Use all cards
      </label>
  </div>
  </h1>    
</div>
<div className="modal-body">
  <div className="ms-3 row justify-content-evenly ">   
  {items.map(item => (
  <div key={item.id} className="col-3  mt-1 " align="left" >
    <label className="form-check-label">
      <input className="form-check-input" type="checkbox" checked={item.checked} onChange={event => handleCheckboxChange(event, item.id)} />
      {' '+item.name}
    </label>
  </div>
))}
  </div>
</div>
<div className="modal-footer d-flex  justify-content-evenly">
  <button type="button" className="btn btn-primary col-4" data-bs-dismiss="modal" onClick={SaveBtn}> Save</button>
  <button type="button" className="btn btn-outline-primary col-4" data-bs-dismiss="modal" onClick={CancelBtn}>Cancel</button>
</div>
</div>
</div>
</div>
</div>
)

}

export default VotingConfiguration;
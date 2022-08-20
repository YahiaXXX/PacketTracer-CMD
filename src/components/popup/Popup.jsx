import React, { useState,useEffect } from "react";
import "./popup.css";

const Popup = ({id, obj,trigger2, open, setOpen }) => {
  const [vlan,setVlan]=useState({
    
    number:0,
    name:""
   })



   const [text,setText]=useState([])
   const [cmd,setCmd]=useState("")
   const [inter,setInter]=useState("")
   const [mode,setMode]=useState("Trunk")
   const [vlan2,setVlan2]=useState(1)
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };


const plusVlan=()=>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({vlan_number:vlan.number,vlan_name:vlan.name})
};
fetch('http://127.0.0.1:8000/project/switch/add_vlan/'+id+'/'+obj.node_id, requestOptions)
    .then(response => {console.log(obj.node_id)})
 


}



const applyAccess=()=>{
  const requestOptions6 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
    body:JSON.stringify({interface_name:inter,vlan_number:vlan2})
};
fetch('http://127.0.0.1:8000/project/switch/configure_interface_access/'+id+'/'+obj.node_id, requestOptions6)
    .then(response => response.json())
 


}
const applyTrunk=()=>{
  const requestOptions7 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
    body:JSON.stringify({interface_name:inter})
};
fetch('http://127.0.0.1:8000/project/switch/configure_interface_trunk/'+id+'/'+obj.node_id, requestOptions7)
    .then(response => {console.log(response)})
 


}
// useEffect(()=>{
//   console.log(obj)
// })


const applyCommande=()=>{
  const requestOptions4 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
      body:JSON.stringify({commande:cmd})
  };
  fetch('http://127.0.0.1:8000/project/commandeline/'+id+'/'+obj.node_id, requestOptions4)
      .then(response => response.json()).then(json=>{setText(json.data);console.log(json.data)} )



}


  return trigger2 ? (
    <div className="pp-up">
      <div className="pp-inner">
        <div className="bloctabs">
          <div
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            interface
          </div>
          <div
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Vlans
          </div>
          <div
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Config
          </div>
        </div>
        

        {toggleState === 1 ? (
          <div className="carré-complet">
            <div className="inppp">
              <div className="inp1">
                <label>Vlan number</label>
                <input type="text"  onChange={(e)=>{setVlan({...vlan,number: e.target.value})}} />
              </div>
              <div className="inp2">
                <label>Vlan name </label>
                <input type="text"  onChange={(e)=>{setVlan({...vlan,name: e.target.value})}}/>
              </div>
              <div className="btt">
              <button className="add"  onClick={()=>{plusVlan()}} >Add</button>
              <button className="add" onClick={()=>{setOpen(false)}}>
          close
        </button>
            </div>
            </div>
            
          
    
            </div>
        ) : (
          ""
        )}



        {toggleState === 2 ? (
          <div className="carré-complet">
            <div className="roling1">
              <div className="r1_div" >
              <label>Interface</label>
              <select className="select_mode" onChange={(e)=>{setInter(e.target.value)}} >
                <option></option>
              {obj.ports.map((item,k)=>(
                   <option key={k} >{item.short_name}</option>
 

                ) ) }
              </select>
              </div>
              
            </div>
            <div className="roling2">
            <div className="r2_div" >
              <label>Mode</label>
              <select className="mode"  onChange={(e)=>{setMode(e.target.value)}} >
                <option>Trunk</option>
                <option>Access</option>
              </select>
              </div>
            </div>

            {mode==="Access" 
            
            ? <div className="input_vlan">
            <label>Vlan</label>
            <input type="text" onChange={(e)=>{setVlan2(e.target.value)}} />
          </div>
            :  <div className="input_vlan">
            <label>Vlan</label>
            <input disabled type="text" onChange={(e)=>{setVlan2(e.target.value)}} />
          </div>
          
          }
           

           <div className="btn_apply" >
           <button className="apply" onClick={
                mode==="Access" 
                
                ? ()=>applyAccess()
                : ()=>applyTrunk()
         


           } >apply</button>
           <button className="apply" onClick={()=>{setOpen(false)}}>
          close
        </button>
           </div>
            
          </div>
        ) : (
          ""
        )}
        {toggleState===3   
    ? <div className="carré-complet">
      <div className="conf-input" >



      <label>Commande</label>
      <select onChange={(e)=>setCmd(e.target.value)} >
        <option></option>
        <option>show vlan</option>
        
        </select>  

        <div>
            <button className="apply"  onClick={()=>{applyCommande()}} >apply</button>
            <button className="apply" onClick={()=>{setOpen(false)}}>
          close
        </button>
        </div>
      </div>
      





      <div className="tx" >
      <p>
       {text.map((item,k)=><p key={k} >{item}</p>)}

       </p>
            





      </div>
      </div>


    :""
  
  
  
  
  
  }

      </div>
    </div>
  ) : (
    ""
  );

  
};

export default Popup;

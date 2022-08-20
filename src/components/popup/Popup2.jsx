import React, { useState,useEffect } from "react";
import "./popup.css";

const Popup2 = ({id,obj2, trigger2, open, setOpen }) => {
 






const applyCommande=()=>{
    const requestOptions4 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Accept': 'application/json' },
        body:JSON.stringify({commande:cmd})
    };
    fetch('http://127.0.0.1:8000/project/commandeline/'+id+'/'+obj2.node_id, requestOptions4)
        .then(response => response.json()).then(json=>{setText(json.data)} )
 


}



  const apply=()=>{
    const requestOptions3 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({interface_name:interf,ip_address:ipconf.ip,mask:ipconf.mask})
    };
    fetch('http://127.0.0.1:8000/project/router/assign_ip_to_interface/'+id+'/'+obj2.node_id, requestOptions3)
        .then(response => response.json())
  
  


  }


   const ajouter=()=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({network:Network})
    };
    fetch('http://127.0.0.1:8000/project/router/rip_config/'+id+'/'+obj2.node_id, requestOptions)
        .then(response => console.log(obj2.node_id) )
  

   }

   const [text,setText]=useState([])
   const [data,setData]=useState([])
   const [interf,setInterf]=useState("")
   const [Network,setNetwork]=useState("")
   const [ipconf,setIpconf]=useState({
    ip:"",
    mask:""
   })
    const [cmd,setCmd]=useState("show running-config")



useEffect(()=>{
    const requestOptions2 = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(' http://127.0.0.1:8000/project/nodes/'+id,requestOptions2)
        .then(response => response.json()).then(json=>setData(json))
  },[])


  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };




  // useEffect(()=>{
  //   console.log(obj2)
   
   
  //  })
  return trigger2 ? (
    <div className="pp-up">
      <div className="pp-inner">
        <div className="bloctabs">
          <div
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Routing
          </div>
          <div
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Interfaces
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
                <label>Network</label>
                <input type="text"  onChange={(e)=>{setNetwork(e.target.value)}} />
              </div>
              <div className="btt">
              <button className="add"  onClick={()=>{ajouter()}}  >Add</button>
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
              <select className="select_mode" onChange={(e)=>{setInterf(e.target.value)}} >
                {obj2.ports.map(item=>(
                   <option>{item.short_name}</option>
 

                ) ) }
              </select>
              </div>
              
            </div>
            <div className="input_vlan">
              <label>Ip address</label>
              <input type="text" onChange={(e)=>{setIpconf({...ipconf,ip:e.target.value})}} />
            </div>
            <div className="input_vlan">
              <label>Net mask</label>
              <input type="text" onChange={(e)=>{setIpconf({...ipconf,mask:e.target.value})}} />
            </div>
           <div className="btn_apply" >
           <button className="apply"  onClick={()=>{apply()}} >Apply</button>
           <button className="add" onClick={()=>{setOpen(false)}}>
          close
        </button>
           </div>
            
          </div>
        ) : (
          ""
        )}
        {toggleState===3   
    ? <div className="carré-complet">
      <div  className="conf-input">

      <label>Commande</label>

       <select onChange={(e)=>setCmd(e.target.value)} >
        <option></option>
        <option>show running-config</option>
        <option>show interfaces</option>
        
        </select>  

        <div>
            <button className="apply"  onClick={()=>{applyCommande()}} >apply</button>
            <button className="add" onClick={()=>{setOpen(false)}}>
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

export default Popup2;

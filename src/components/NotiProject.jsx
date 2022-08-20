import React, { useState,useEffect } from "react";
import "./Notification.css";

function NotiProject({bool, setBool,trigger, pop, setPop }) {
  const [project,setProject] = useState("");


//   useEffect(()=>{
   
//     fetch(
//       "http://127.0.0.1:8000/project/nodes/8aa780ef-6d02-4d66-a890-d7f1d3f2f7d4"
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         setData1(json);
//       });

//   },[])



//   useEffect(()=>{
    
      
//         },[])

const addProject=()=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({name:project})
    };
    fetch('http://localhost:8000/project/', requestOptions)
        .then(response => response.json()).then(json=>{})

 

}



  return trigger ? (
    <div className="notification">
      <div className="notification-inner-project">
        <div className="titre">
          <h2> add Project </h2>
        </div>
        <div className="inputs">
          <div className="row1">
            <div className="input-globale-project">
             <div className="label" >
              <label htmlFor="input1">Project name:</label></div> 
              
              <input type="text" className="input-project" onChange={(e)=>{setProject(e.target.value)}} /> 
            </div>
            
          </div>
        </div>
        <div className="ferme-project">
          <button
            className="close-btn-project"
            onClick={() => {
              addProject();
              setBool(!bool)
            }}
          >
           ADD
          </button>
          <button
            className="close-btn-project"
            onClick={() => {
              setPop(false);
            }}
          >
           Close
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default NotiProject;

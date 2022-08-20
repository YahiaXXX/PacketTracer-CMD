import React, { useState, useEffect } from "react";
import "./Notification.css";

function Alert({setAlert,trigger,alert}) {
 

  

  

   
  
 



  return trigger ? (
    <div className="notification-prj">
      <div className="notification-inner-prj">
        <div className="titre">
          <h2> Please open the project </h2>
        </div>
        
        <div className="ferme">
          <button
            className="close-btn"
            onClick={()=>setAlert(false)}
            
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

export default Alert;

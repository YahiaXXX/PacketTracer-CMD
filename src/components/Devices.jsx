import React, { useState } from "react";
import TableConfig from "./TableConfig";
import TableDevices from "./TableDevices";
import "./main.css";
import Noti from "./Noti";
import Popup from "./popup/Popup";

function Devices({id,bool2,setBool2,bool,setBool}) {
  const [bool3,setBool3]=useState(false)
  const [pop, setPop] = useState(false);
  return (
    <div className="tables">
      {bool  
      ?  <div className="table1">
      <div className="textdevice">
        <h1 className="text">Nodes</h1>
      </div>

      <div className="tabledevice">
        <TableDevices id={id} bool2={bool2} />
      </div>
    </div>
      :  <div className="table2">
      <div className="textconfig">
        <h1 className="text">Links</h1>
        <button
          className="btn"
          onClick={() => {
            setPop(true);
          }}
        >
          add links
        </button>

        <Noti bool3={bool3} setBool3={setBool3} id={id} trigger={pop} pop={pop} setPop={setPop} />
      </div>

      <div className="tableconfig">
        <TableConfig bool3={bool3} id={id}  />
      </div>
    </div>
      
      
      
      }

    </div>
  );
}

export default Devices;

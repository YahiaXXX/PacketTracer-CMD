import React, { useState, useEffect } from "react";
import "./main.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Popup from "./popup/Popup";
import Popup2 from "./popup/Popup2";
import Noti from "./Noti";
import axios from "axios";

function TableDevices({id,bool2}) {
 
  axios.interceptors.request.use((error) => {
    return Promise.reject(error);
  });
  const [open2, setOpen2] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  let [index,setIndex]=useState(-1);
  const [bool,setBool]=useState(false)


  const handleIndex = (thisindex,cat) => {
    setIndex(thisindex);
    if(cat==='router'){setOpen2(true)}
    if(cat==='switch'){setOpen(true)}
   

  };
  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/project/nodes/"+id
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, [bool2,bool]);

//  const openPop=(cat)=>{

//   if (cat==="switch"){setOpen(true)}
//   if (cat==="router"){setOpen2(true)} 

//  }
const deleteNode=(nodeId)=>{
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
};
fetch('http://localhost:8000/project/delete/node/'+id+'/'+ nodeId, requestOptions)
    .then(response => {console.log(response);setBool(!bool)})}


  return (
    <table className="table-content">
      <thead>
        <tr>
          <th>Node name</th>
          <th>Node type</th>
          <th>Console</th>
          <th>Port</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, k) => (
          <tr key={k}>
            <td>
              <div> {item.name}</div>
            </td>
            <td>
              <div>{item.node_type}</div>
            </td>
            <td>
              <div>{item.console_type}</div>
            </td>
            <td>
              <div>{item.console}</div>
            </td>

            <td>
              <div className="action-nodes">
                <DeleteForeverOutlinedIcon className="action-delete"  
                onClick={()=>{
                  deleteNode(item.node_id)
                }}
                
                />
                <SettingsOutlinedIcon
                  className="action-conf"
                  onClick={() => {
                    handleIndex(k,item.category)
                    // openPop(item.category)
                   }}
                />

               

              </div>
              {index === k && (
                   <Popup id={id} obj={item} open={open} setOpen={setOpen} trigger2={open} />
                   
                )}
                {index===k && (<Popup2  id={id} obj2={item}  open={open2} setOpen={setOpen2} trigger2={open2} />
             )}
                
               
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableDevices;

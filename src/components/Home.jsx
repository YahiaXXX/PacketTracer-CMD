import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./home.css";
import "./projectTable.css";
import NotiProject from "./NotiProject";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert"

function Home() {
  const [q,setQ]=useState("")
  const [data, setData] = useState([]);
  const [pop, setPop] = useState(false);
  const [bool, setBool] = useState(false);
  const [alert,setAlert]= useState(false)
  const navigate=useNavigate()

  useEffect(() => {
    fetch("http://localhost:8000/project/")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, [bool]);

  const startProject=(id)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({})
  };
  fetch('http://localhost:8000/project/open/'+id, requestOptions)
      .then(response => {console.log(response);setBool(!bool)})}

      const closeProject=(id)=>{
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({})
      };
      fetch('http://localhost:8000/project/close/'+id, requestOptions)
          .then(response => {console.log(response);setBool(!bool)})}

          const deleteProject=(id)=>{
            const requestOptions = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
          };
          fetch('http://localhost:8000/project/'+id, requestOptions)
              .then(response => {console.log(response);setBool(!bool)})}

  return (
    <div>
      <NavBar />

      <div className="pr">
        <h2>projects</h2>
        <button
          className="boutton_add"
          onClick={() => {
            setPop(true);
          }}
        >
          + add Project{" "}
        </button>
        <NotiProject
          bool={bool}
          setBool={setBool}
          trigger={pop}
          pop={pop}
          setPop={setPop}
        />
      </div>

      <div className="search_pr">
        <input type="text" placeholder="search" className="input_pr" onChange={(e)=>{setQ(e.target.value)}} />
      </div>

      <div className="project_table">
        <table className="project-table-content">
          <thead>
            <tr>
              <th> <div> Name</div></th>
              <th> <div>Status</div> </th>
              <th><div>Actions</div></th>
            </tr>
          </thead>
          <tbody>
            {data.filter((item)=>
            item.name.toLowerCase().includes(q))
            .map((item, k) => (
              <tr key={k}>
                <td>
                  <div className="prj"  onDoubleClick={()=>{
                    if(item.status==="opened") navigate('/main/'+item.project_id)
                    else setAlert(true)

                  }} >{item.name}</div>
                  <Alert setAlert={setAlert}  trigger={alert} alert={alert}  />
                </td>
                <td>
                  <div>{item.status}</div>
                </td>
                <td>
                  <div className="actions-project" >
                    {item.status==="closed"
                    ? <p  className="start" onClick={()=>{
                      startProject(item.project_id)
                      
                    }} >Start</p>

                    :<p  className="start" onClick={()=>{
                        closeProject(item.project_id)
                        
                      }} >Close</p>
                    
                    
                    
                    }
                    
                      
                      <p className="delete" onClick={()=>{
                        deleteProject(item.project_id)
                      }} >delete</p>

                  </div>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

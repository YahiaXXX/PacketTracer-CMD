import React, { useState, useEffect } from "react";
import "./Notification.css";

function Noti({bool3,setBool3, id, trigger, pop, setPop }) {
  const [data1, setData1] = useState([]);
  const [dt, setDt] = useState([]);
  const [dt2, setDt2] = useState([]);

  const [node1, setNode1] = useState();
  const [node2, setNode2] = useState();
  const [port1, setPort1] = useState("");
  const [port2, setPort2] = useState("");
  const [bool, setBool] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/project/nodes/" + id)
      .then((res) => res.json())
      .then((json) => {
        setData1(json);
      });
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://127.0.0.1:8000/project/nodes/interfaces/" + id + "/" + node1,
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        setDt(json.data);
        console.log(json.data);
      });
  }, [node1]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://127.0.0.1:8000/project/nodes/interfaces/" + id + "/" + node2,
      requestOptions
    )
      .then((res) => res.json())
      .then((json) => {
        setDt2(json.data);
        console.log(json.data);
      });
  }, [node2]);

  //  useEffect(()=>{
  //   console.log(dt)
  //  },[node1])
//  const findNode=(a,data)=>{
//   return  data.filter((item)=>
//    item.node_id===a)
 
//  }
 const findNumber=(a,data)=>{
 let x = data.filter((item)=>
  item.short_name===a
 
 )
return x[0]

 }

 const addLink=(int1,int2)=>{
  // let node1 = findNode(node1,data1)
  // let node2 = findNode(node2,data1)
  let interface1 =  findNumber(int1,dt)
  let interface2 =  findNumber(int2,dt2)
   
  const requestOptions = {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify({
      node_id_1: node1,
      node_id_1_adapter_number:interface1.adapter_number,
      node_id_1_port_number:interface1.port_number,
      node_id_2:node2,
      node_id_2_adapter_number:interface2.adapter_number,
      node_id_2_port_number: interface2.port_number })
  };

  fetch(
    "http://127.0.0.1:8000/project/links/" + id,
    requestOptions
  ).then((res)=>{console.log(res.data);console.log(requestOptions.body)})



 }



  return trigger ? (
    <div className="notification">
      <div className="notification-inner">
        <div className="titre">
          <h2> add link </h2>
        </div>
        <div className="inputs">
          <div className="row1">
            <div className="input-globale">
              <div className="label">
                <label htmlFor="input1">first Node:</label>
              </div>
              <select
                type="text"
                className="inp"
                onChange={(e) => {
                  setNode1(e.target.value);
                }}
              >
                <option></option>
                {data1.map((item, k) => (
                  <option  value={item.node_id}  key={k}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="input-globale">
              <div className="label">
                <label htmlFor="input2">Port:</label>
              </div>

              <select
                type="text"
                className="inp"
                onChange={(e) => {
                  setPort1(e.target.value);
                }}
              >
                <option></option>
                {dt.map((item, k) => (
                  <option key={k}> {item.short_name} </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row2">
            <div className="input-globale">
              <div className="label">
                <label htmlFor="input1">second Node:</label>
              </div>
              <select
                type="text"
                className="inp"
                onChange={(e) => {
                  setNode2(e.target.value);
                }}
              >
                <option></option>

                {data1.map((item, k) => (
                  <option value={item.node_id} key={k} >{item.name}</option>
                ))}
              </select>
            </div>
            <div className="input-globale">
              <div className="label">
                <label htmlFor="input2">Port:</label>
              </div>
              <select
                type="text"
                className="inp"
                onChange={(e) => {
                  setPort2(e.target.value);
                }}
              >
                <option></option>
                {dt2.map((item, k) => (
                  <option key={k}> {item.short_name} </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="ferme">
          <button
            className="close-btn"
            onClick={() => {
           addLink(port1,port2)
            }}
          >
            ADD
          </button>
          <button className="close-btn" onClick={()=>{
            setPop(false)
            setBool3(!bool3)
          }}  >Close</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Noti;

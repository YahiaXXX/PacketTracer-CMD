import React,{useState,useEffect} from 'react'
import './main.css'
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";




function TableConfig({id,bool3}) {

  const [data,setData]=useState([])
  const [bool,setBool]=useState(false)


  useEffect(()=>{
    fetch(
      "http://127.0.0.1:8000/project/links/"+id)
                  .then((res) =>res.json()).then(json=>{setData(json)})
                  
              


  },[bool,bool3])



  const handleDelete=(a,b)=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({node_1_name:a,node_2_name:b})
  };
  fetch('http://127.0.0.1:8000/project//link/delete/'+id, requestOptions)
      .then(response => {console.log(response); setBool(!bool)})

 

  }


  return (
    <table  className="table-content" >
    <thead>
      <tr>
        <th >Node A</th>
        <th>Port A</th>
        <th>Node  B</th>
        <th>NodeB</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item,k)=>(

<tr key={k} >
<td><div>{item[0]}</div></td>
<td><div>{item[1]}</div></td>
<td><div>{item[2]}</div></td>
<td><div>{item[3]}</div></td>
<td><div>
<DeleteForeverOutlinedIcon className="action-delete" 
 onClick={()=>{
    handleDelete(item[0],item[2]);
   

 }}
 
 
 />
  
  </div></td>
</tr>


      ))}
      
    </tbody>
  </table>
  )
}

export default TableConfig



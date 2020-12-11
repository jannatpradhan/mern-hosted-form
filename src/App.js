
import { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [firstName,setFirstName]=useState("");
  const [lastName,setlastName]=useState("")
  const [email,setemail]=useState("")
  const [phone,setphone]=useState("")
  const [image,setimage]=useState("")
  const [UserData,setUserData]=useState([])
  const [newData,setNewData]=useState("")

  useEffect(()=>{
    Axios.get("https://mern-demo-form.herokuapp.com/view").then((res)=>{
      console.log(res.data)
      setUserData(res.data)
    })
  },[])

  const addToField=()=>{
    Axios.post("https://mern-demo-form.herokuapp.com/insert",{
      firstName:firstName,
      email:email,
      lastName:lastName,
      phone:phone,
      image:image
    })
    alert("Submitted");
  }

const updateData=(id)=>{
  Axios.put("https://mern-demo-form.herokuapp.com/update",{
    id:id,
    newData:newData
  }).then((res)=>{
    alert("Data updated...please refresh the page")
  })
};


const deleteData=(id)=>{
  Axios.delete(`https://mern-demo-form.herokuapp.com/delete/${id}`)
  .then((res)=>{
    alert("Data deleted...please refresh the page")
  })
};

  return (
    <div className="App">
      <h1>My form</h1>
      <label>First Name</label>
      <input type="text" onChange={(event)=>{setFirstName(event.target.value)}}/>
      <label>Last Name</label>
      <input type="text" onChange={(event)=>{setlastName(event.target.value)}}/>
      <label>Email ID</label>
      <input type="text" onChange={(event)=>{setemail(event.target.value)}}/>
      <label>Phone Number</label>
      <input type="text" onChange={(event)=>{setphone(event.target.value)}}/>
      <label>Upload Image</label>
      <input type="file" onChange={(event)=>{setimage(event.target.value)}}/>
      <button onClick={addToField}>Add</button>
      <div>
        <h1>UserData</h1>
        {UserData.map((val,key)=>{
          return <div key={key}>
                    <h1>{val.FirstName} {val.LastName}</h1>
                    <h2>{val.Email}</h2>
                    <h2>{val.Phone}</h2>
                    <input type="text" placeholder="Enter data" onChange={(event)=>{setNewData(event.target.value)}}/>
                    <button onClick={()=>updateData(val._id)}>Update</button>
                    <button onClick={()=>deleteData(val._id)}>Delete</button>
                 </div>
        })}
      </div>
    </div>
  );
}

export default App;

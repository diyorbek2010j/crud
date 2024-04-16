import React, {useState} from 'react'
import axios from "axios"


function Crud() {
    const [data, setData] = useState([])
    const [newItem, setNewItem] = useState("")
    const [updateValue,  setUpdateValue] = useState("")
    const [deletedId, setDeletedId] = useState("")
    //---------------SEARCH---------------
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    //--------------GETPERSON----------------
    const getData = async(req, res)=>{
        try{
            let res = await axios.get("/person/getPerson")
            setData(res.data)
        }catch(error){
            console.log("Error adding data", error);
        }
    }
    //------------UPDATEPERSON----------------
    const updateData = async(id, newValue)=>{
        try{
            let res = await axios.get(`/person/updatePerson/${id}`, newValue)
            const updatePerson = data.map(item => item.id === id ?  {...data, value: newValue} : item)
            setData(updatePerson)
        }catch(error){
            console.log("Error updateing data", error);
        }
        
    }
    //---------------DELETEDATA----------------
    const deleteData = async(id, newValue)=>{
        try{
            let res = await axios.get(`/person/deletePerson/${id}`, newValue)
            const deletePerson = data.filter(item => item.id !== id)
            setData(deletePerson)

        }catch(error){
            console.log("Error deleted data", error);
        }
    }
    //------------------SEARCH------------------
    const handleSearch = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios.get(`/person/searchPerson?query=${query}`)
            setResults(res.data.innerData)
        }catch(error){
            console.log("Error searching data", error);
        }
    }
  return (
    <div>
    <h1>CRUD operator</h1>
    <ul>
        <li>
            <input onChange={(e)=> setQuery(e.target.value)} value={query} type="text" placeholder='searching..........' />
        </li>
        <li>
            <button onClick={handleSearch}>Search</button>
        </li>

    </ul>
    <div>
        {
            data.map(item =>{
                <ul key={item.id}>
                    <li>{item.firstname}</li>
                    <li>{item.name}</li>
                    <li>{item.surename}</li>
                    <li>{item.years}</li>
                    <li>{item.birthday}</li>
                    <li><button onClick={()=> updateData(item.id, updateValue)}>Update</button></li>
                    <li><button onClick={()=> deleteData(item.id)}>Delete</button></li>
                </ul>
            })
        }
        <ul>
            <li><input onChange={(e)=> setNewItem(e.target.value)} type="text" placeholder='Add Person' /></li>
        </ul>
    </div>
    </div>
  )
}

export default Crud
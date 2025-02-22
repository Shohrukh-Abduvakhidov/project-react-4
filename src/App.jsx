import React, { useEffect, useState } from "react";
import { Card, Typography, Modal } from "antd";
import {Table , TableCell ,Button , TableBody , TableHead,InputLabel ,  TableContainer ,Checkbox, MenuItem ,Select , Input , TableRow} from "@mui/material"
import axios from "axios";
import { DeleteFilled , EditFilled } from "@ant-design/icons";
// const Api = "https://6788f5c12c874e66b7d708f0.mockapi.io/users";
const Api = "https://678a87d7dd587da7ac2a8ca1.mockapi.io/Users"
const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isopen, SetIsopen] = useState(false);
  const [isopenE, SetIsopenE] = useState(false);
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [city,setCity] = useState("")
  const [nameE,setNameE] = useState("")
  const [emailE,setEmailE] = useState("")
  const [cityE,setCityE] = useState("")
  const [edit,SetEdit] = useState({})
  const [select,setSelect] = useState("")
  const ShowModal = () => SetIsopen(true);
  const CloseModal = () => SetIsopen(false)
  const ShowModalE = () => SetIsopenE(true);
  const CloseModalE = () => SetIsopenE(false)
  const addForm = () => {
    let newUser = {
      name : name,
      email : email,
      city : city,
      status : false,
    }
    postUser(newUser)
    CloseModal()
    setName("")
    setEmail("")
    setCity("")
  }
  async function postUser(user)
  {
    try {
      await axios.post(Api,user)
      get()
    } catch (error) {
      console.error(error);
    }
  }
  async function get() {
    try {
      const url = select && select !== "all" ? `${Api}?status=${select == "active"}` : Api;
      const { data } = await axios.get(url);
      const filtered = data.filter((user) =>
        JSON.stringify(user).toLowerCase().includes(search.toLowerCase())
      );
      setUsers(filtered);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    get();
  }, [search,select]);

  async function deleteUser(id) {
    await axios.delete(`${Api}/${id}`);
    get();
  }
  async function putUser(user) {
    try {
      await axios.put(`${Api}/${user.id}`,user)
      get()
    } catch (error) {
      console.error(error);
    }
  }
  function editUser(user)
  {
    SetEdit(user)
    setNameE(user.name)
    setEmailE(user.email)
    setCityE(user.city)
    editForm(user)
    ShowModalE()
  }
  function editForm(user)
  {
    let updateUser = {
      ...user,
      name : nameE,
      email : emailE,
      city : cityE,
      status : false
    }
    putUser(updateUser)
    CloseModalE()
  }
  async function isChecked(user)
  {
    let updateUser = {...user, status : !user.status}
    await putUser(updateUser)
  }
  return (
    <>
      <div className="fixed z-2 lg:left-[5%] rounded-b-2xl top-0 bg-gray-800 w-[100%] lg:w-[90%] h-[100px] m-auto px-[20px] py-[20px] flex justify-between items-center">
        <div className="">
        <Input
          className="lg:w-[250px] w-[170px] bg-[white] px-[10px] rounded-2xl"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select name="" value={select} onChange={(e) => setSelect(e.target.value)} id="" className="text-[#fff] mx-[10px] border-1 py-[5px] rounded-md">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        </div>
        <Button variant="contained" sx={{display : {xs : "none", md: "block"}}} onClick={ShowModal}>+ ADD NEW</Button>
        <Button variant="contained" sx={{display : {xs : "block", md: "none"}}} onClick={ShowModal}>+</Button>
      </div>
      <TableContainer sx={{
        width : {xs : "100%" , md : "90%"},
        margin : "100px auto"
      }}>
        <Table sx={{xs : "70%" , md : "100%"}}>
          <TableHead>
            <TableRow sx={{color : "#fff"}}  className="border-1 bg-gray-500 text-[#fff]">
            <TableCell className="text-white">ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>CITY</TableCell>
            <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.length == 0 ? <h1 className="text-[70px] text-red-700 font-bold absolute text-center lg:left-[35%]">NOT FOUND</h1> : users.map((user) => {
              return (
                <TableRow key={user.id} className="border-b-2 border-gray-600">
                  <TableCell className="">{user.id}</TableCell>
                  <TableCell className="font-bold">{user.name}</TableCell>
                  <TableCell className="w-[100px] text-center"><p className={user.status ? "rounded-md text-center py-[10px] bg-green-500 text-[#fff] font-bold" : "text-center py-[10px] rounded-md bg-red-500 text-[#fff] font-bold"}>{user.status ? "Active" : "Inactive"}</p></TableCell>
                  <TableCell className="font-bold lg:w-[100px]">{user.email}</TableCell>
                  <TableCell className="font-bold lg:w-[100px]">{user.city}</TableCell>
                  <TableCell className="font-bold lg:w-[200px] flex justify-center items-center gap-[10px]">
                    <DeleteFilled style={{color : "red" , fontSize : "20px"}} onClick={() => deleteUser(user.id)}/>
                    <EditFilled style={{color : "blue" , fontSize : "20px" , margin : "0px 20px"}} onClick={() => editUser(user)}/>
                    <Checkbox checked={user.status} onChange={() => isChecked(user)}/>
                  </TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Modal title="Add User" className="" open={isopen} onOk={addForm}  onCancel={CloseModal}>
        <form className="flex flex-col items-center justify-center gap-[15px]">
        <input label="Name" value={name} onChange={(e) => setName(e.target.value)} className="border-1 py-[5px] w-full" placeholder="Name..."/>
        <input label="Name" value={email} onChange={(e) => setEmail(e.target.value)} className="border-1 py-[5px] w-full" placeholder="Email..."/>
        <input label="Name" value={city} onChange={(e) => setCity(e.target.value)} className="border-1 py-[5px]   w-full" placeholder="City..."/>
        </form>
      </Modal>
      <Modal title="Edit User" className="" open={isopenE} onOk={() =>editForm(edit)}  onCancel={CloseModalE}>
        <form className="flex flex-col items-center justify-center gap-[15px]">
        <input label="Name" value={nameE} onChange={(e) => setNameE(e.target.value)} className="border-1 py-[5px] w-full" placeholder="Name..."/>
        <input label="Name" value={emailE} onChange={(e) => setEmailE(e.target.value)} className="border-1 py-[5px] w-full" placeholder="Email..."/>
        <input label="Name" value={cityE} onChange={(e) => setCityE(e.target.value)} className="border-1 py-[5px]   w-full" placeholder="City..."/>
        </form>
      </Modal>
    </>
  );
};

export default App;

import React, { useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../../Redux/actions";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer"
export default function Profile(){
    const user = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [input, setInput] = useState({
        id: 1,
        name: "",
        lastName: "",
        userName: "",
        email: "",
        image: "https://cdn-icons-png.flaticon.com/512/6542/6542966.png"
    })
    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        userName: "",
        email: "",
      });
    const validate = (input) =>{
        let errors = {}
        if(!input.name) errors.name = "Name is Required"
        if (!input.lastName) errors.lastName = "Last Name is Required"
        if (!input.userName) errors.lastName = "User Name is Required"
        return errors
    }
    const handleChange = (event) =>{
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        setErrors(
            validate({
                ...input,
                [event.target.name] : event.target.value
            })
        )
    }
    const handleLogOut = (event) => {
        event.preventDefault();
        dispatch(deleteUser())
        navigate('/')
    }

    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addUser(input))
        alert('User Successful')
        setInput({
        id: 1,
        name: "",
        lastName: "",
        userName: "",
        email: "",
        })
        navigate('/')
    }
    if(user.id) {
        return(
            <div class='container'>
                <Navbar />
                <div  class='container-xl bg-light my-5 px-2 col-md-4'>
                    <div>
                        <div>
                            <img height="50px" width='50px' src={user.image} alt="user image" />
                            <h2>id: {user.id}</h2>
                        </div>
                    
                    <h2>User Name: {user.name}</h2>
                    <h1>First Name: {user.name}</h1>
                    <h2>Last Name: {user.lastName}</h2>
                    <h2>Email: {user.email}</h2>
                    <button class="btn btn-dark btn-lg col-md-4 my-2" onClick={(e) => handleLogOut(e)} >Log Out</button>
                    </div>
                </div>
                <div class='container fixed-bottom'>

                <Footer />
                </div>
            </div>
        )
    }else{
        return(
            <div class='container' >
                <Navbar />
                <div className='container-xl bg-light my-5 px-2 col-md-4'>
                    
                    <form onSubmit={handleSubmit}class="row justify-content-md-center  mx-5 px-4" >
                        <h1>Create your Profile</h1>
                        <div class='from-group'>
                        <label>First name: </label>
                        <input class="form-control" type="text" name="name" value={input.name} onChange={handleChange} placeholder="First name" autoFocus />
                        </div>
                        <div class='from-group'>
                        <label>Last name: </label>
                        <input class="form-control" type="text" name="lastName" value={input.lastName} onChange={handleChange} placeholder="Last name" />
                        </div>
                        <div class='from-group'>
                        <label>Username: </label>
                        <input class="form-control" type="text" name="userName" value={input.userName} onChange={handleChange} placeholder="Your Usuername" />
                        </div>
                        <div class='from-group'>
                        <label>Email</label>
                        <input class="form-control" type="text" name="email" value={input.email} onChange={handleChange} placeholder="example@mail.com" />
                        </div>
                        <button class="btn btn-dark btn-lg col-md-4 my-2"  disabled={errors.name || errors.lastName || errors.email || !input.name} type="submit">Submit</button>
                    </form>
                </div>
                <div class='container fixed-bottom'>

                <Footer />
                </div>
            </div>
        )
    }
}
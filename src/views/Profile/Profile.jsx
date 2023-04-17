import React, { useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../../Redux/actions";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import style from '../../components/ReviewForm/ReviewFormPage.module.css'


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
    var regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const validate = (input) =>{
        let errors = {}
        if(!input.name) errors.name = "Name is Required"
        if (!input.lastName) errors.lastName = "Last Name is Required"
        if (!input.userName) errors.userName = "User Name is Required"
        if (!regExp.test(input.email)) errors.email = "Invalid email - Please verify data";
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
                <div  class='container-xl bg-white my-5 px-2 col-md-4'>
                    <div>
                        <div>
                            <img height="50px" width='50px' src={user.image} alt="user image" />
                            <br/>
                            <h4>id: {user.id}</h4>
                        </div>
                        <br/>                    
                    <h3>User Name</h3> 
                        <h4>{user.userName}</h4>
                        <hr />
                    <h3>First Name</h3>
                        <h4> {user.name}</h4>
                    <h3>Last Name</h3> 
                        <h4>{user.lastName}</h4>
                        <hr/>
                    <h3>Email</h3>
                        <h4>{user.email}</h4>
                        <br/>
                    <button class="btn btn-dark btn-lg col-md-4 my-2" onClick={(e) => handleLogOut(e)} >Log Out</button>
                    <br/>
                    </div>
                </div>
                <br/>
                <br/>           
                <Footer />      
            </div>
        )
    }else{
        return(
            <div class='container' >
                <Navbar />
                    <div className={style.content}></div>
                    <div class='container-sm' ></div>
                    <div class="row justify-content-center">
                    <div class="col-7">
                    <form onSubmit={handleSubmit}class="row justify-content-md-center  mx-5 px-4" >
                        <h2>Create your Profile</h2>
                        <div class='form-group'>
                        <label>First name: </label>
                        <input class="form-control" type="text" name="name" value={input.name} onChange={handleChange} placeholder="First name" autoFocus />
                        <br />
                        <span>{errors.name? errors.name : ""}</span> 
                        </div>
                        <div class='form-group'>
                        <label>Last name: </label>
                        <input class="form-control" type="text" name="lastName" value={input.lastName} onChange={handleChange} placeholder="Last name" />
                        <br />
                        <span>{errors.lastName? errors.lastName : ""}</span> 
                        </div>
                        <div class='from-group'>
                        <label>Username: </label>
                        <input class="form-control" type="text" name="userName" value={input.userName} onChange={handleChange} placeholder="Your Username" />
                        <br />
                        <span>{errors.userName? errors.userName : ""}</span> 
                        </div>
                        <div class='from-group'>
                        <label>Email</label>
                        <input class="form-control" type="text" name="email" value={input.email} onChange={handleChange} placeholder="example@mail.com" />
                        <br />
                        <span>{errors.email? errors.email : ""}</span> 
                        </div>
                        <button class="btn btn-dark btn-lg col-md-4 my-2"  disabled={errors.name || errors.lastName || errors.email || !input.name} type="submit">Submit</button>
                    </form>
                <div class='container fixed-bottom'>
                </div>
                </div>
                </div>
                <Footer />
                </div>
        )
    }
}
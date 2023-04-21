import React, { useState } from "react";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";
import style from '../../components/ReviewForm/ReviewFormPage.module.css'


export default function Profile(){
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

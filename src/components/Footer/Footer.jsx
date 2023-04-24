import React from "react";
import { Link } from 'react-router-dom';

export default function Footer(){
    return(
        <footer className="bg-dark">
            <div className="container-fluid">
                <div className="row border-top justify-content-between p-3">
                    <div className="col-sm p-0">
                    <Link to="/about" className="text-light text-decoration-none">About us</Link>
                    </div>
                    <div className="col-sm d-flex flex-row-reverse">
                     <span className="text-light alig-items-end">©Book4all</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
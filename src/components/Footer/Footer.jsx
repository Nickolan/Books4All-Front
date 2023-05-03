import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Footer() {
    return(
        <AppBar position="fixed-bottom" color="primary" style={{ backgroundColor: '#000000'}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="body1" color="inherit">
        <Link to="/about" className="text-light text-decoration-none">About us</Link>
        </Typography>
        <Typography variant="body1" color="inherit">
            ©Books4All
        </Typography>
      </Toolbar>
    </AppBar>
    )
}
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState } from "react";
import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../../App.css";
import { Box } from "@mui/material";

export default function App() {
  const user = sessionStorage.getItem('userData')
  const user1 = JSON.parse(user)
  const [value, setValue] = useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

//   const handleComplete = (finalValue) => {
//     alert(finalValue);
//   };
  if(!sessionStorage.getItem('userData')){
    window.location = '/'
}
    /*Verify*/
    const handleSubmit = () => {
        // event.preventDefault();
        // const data = new FormData(event.currentTarget)
        const user = sessionStorage.getItem('userData')
        const jsondata = {
            user: user,
            otp: value
          }
          async function postJSON(jsondata) {
            try {
              const response = await fetch("http://127.0.0.1:8080/verifyuser", {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(jsondata),
              });
              const result = await response.json();
              if(result.status==='ok'){
                alert(result.message)
                sessionStorage.clear();
                window.location = '/'
            }if(result.status==='error'){
                alert(result.message)
            }
            } catch (error) {
              console.error("Error:", error);
            }
          }
          postJSON(jsondata);
      };
  return (
    <Box>
      <div className="App">
        <h1>Check OTP On your email</h1>
        <p>{user1.email}</p>
        </div>
      <div className="form">
      <MuiOtpInput
        length={4}
        // onComplete={handleSubmit}
        value={value}
        onChange={handleChange}
      />
    </div>
    <div className="App">
    <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2, mb: 2 }}>Submit OTP</Button>
    </div>
    </Box>
    
  );
}
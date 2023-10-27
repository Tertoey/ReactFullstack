import React, {useEffect} from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Card, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import "./App.css";


export default function App() {

    const [inputValue, setInputValue] = useState('');
    const [displayedData, setDisplayedData] = useState('');

  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleButtonClick = () => {
      setDisplayedData(inputValue);
    };
    const [lastDocument, setLastDocument] = useState(0);

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://127.0.0.1:8080/user');
          if (response.ok) {
            const data = await response.json();
            setLastDocument(data);
          } else {
            console.error('Error fetching data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData()
      setTimeout(() => setLastDocument(prevState=>prevState+1), 10000);
    }, [lastDocument]);
  

  return (
      <Box>
        <Stack direction="row">
          <Button sx={{width:100}}variant="text">Text</Button>
          <Button sx={{width:100, m:1}}variant="contained">Contained</Button>
          <Button sx={{width:100, m:1}}variant="outlined">Outlined</Button>
        </Stack>

      <Box sx={{ width: 500 }}>
        <Slider
          defaultValue={20}
          min={0}
          max={50}
          aria-label="Small"
          valueLabelDisplay="auto"
          onChange={handleChange}
          onChangeCommitted={handleButtonClick}
        />
        <Button className='Mybutton' disabled sx={{width:100}}variant="text">Text</Button>
        <Button className='Mybutton' sx={{width:100}}variant="text">Text</Button>
      </Box>
      <div>
      <h1>React MUI Input and Display</h1>
      <TextField
        label="Enter Data"
        variant="outlined"
        value={inputValue}
        onChange={handleChange}
      />
      <button onClick={handleButtonClick}>Show Data</button>
      <div>
        <h2>Entered Data:</h2>
        <p>{displayedData}</p>
        <p>name: {lastDocument.name}</p>
        
      </div>
    </div>
        <Card variant='outlined' sx={{ maxWidth: 300, height:190}}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Flow meter
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {lastDocument.price} bath
            </Typography>
          </CardContent>
        </Card>
      </Box>
  );
}

// import React from 'react';
// import { FaCircle } from 'react-icons/fa';

// function LedApp() {
//   // Define the value (1 for red, 0 for green)
//   const value = 0;

//   // Define the color based on the value
//   const color = value === 1 ? 'red' : 'green';

//   return (
//     <div>
//       <h1>LED Example</h1>
//       <p>LED 1: <FaCircle style={{ color, fontSize: '24px' }} /></p>
//     </div>
//   );
// }

// export default LedApp;

import React, {useEffect} from 'react';
import { useState } from 'react';
import { Container, Card, CardContent, Typography, Grid } from '@mui/material';
import '../style/dashboard.css';

const cards = [
  { id: 1, title: 'Card 1', content: 'Content for Card 1' },
  { id: 2, title: 'Card 2', content: 'Content for Card 2' },
  { id: 3, title: 'Card 3', content: 'Content for Card 3' },
  { id: 4, title: 'Card 4', content: 'Content for Card 4' },
  { id: 5, title: 'Card 5', content: 'Content for Card 5' },
  { id: 6, title: 'Card 6', content: 'Content for Card 6' },
];

const gridProperties = {
    xs: 12,
    sm: 6,
    md: 4,
  };

  const gridSpacing = {
    spacing:6,
    justifyContent:'center'
  }
  
  const Dashboard = () => {
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
      setTimeout(() => setLastDocument(prevState=>prevState+1), 100000);
    }, [lastDocument]);
    
    return (
      <Container>
        <Grid container {...gridSpacing}>
          {cards.map((card) => (
            <Grid item key={card.id} {...gridProperties}>
              <Card className="custom-card">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  };
  
  export default Dashboard;

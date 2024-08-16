import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import empImage from '../static/images/empiar_reference.jpg';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';

interface HomeTilesProperties {
    title: string,
    descritpion: string,
    entrycount: number,
    route: string,
}

export default function HomeTiles(props:HomeTilesProperties) {
  
  return (
    <Grid alignItems="left" >
    <Card sx={{ minWidth:345, maxWidth: 345}}>
      <CardMedia
        sx={{ height: 110 }}
        image={empImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {props.descritpion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() =>  window.open(props.route ,'_blank', 'rel=noopener noreferrer')}>Total Published Entries: {props.entrycount}</Button>
      </CardActions>
    </Card>
    </Grid>
  );
}
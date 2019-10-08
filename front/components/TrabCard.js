import React from 'react';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import '../css/TrabCard.scss'



const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 250,
  },
  media: {
    height: 60,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
}));

export default function RecipeReviewCard({data}) {
  const classes = useStyles();
  return (
    <div id = "container_card_contents">
        <a href = {`/postcontent/${data.id}`}style = {{textDecoration : 'none'}}>
          <Card className={classes.card} id ="card_container">
              <CardContent id = "card_head">
                <img id = "card_main_image" src = {data.image} width = "100%" height = "100%"/>
              </CardContent>
              <CardContent>
                  <Typography variant="body2" color="textSecondary" id = "card_contents">
                      <h4>{data.title}</h4>
                      <p>{data.user_name}</p>
                  </Typography>
              </CardContent>
              
          </Card>
        </a> 
    </div>
    
  );
}
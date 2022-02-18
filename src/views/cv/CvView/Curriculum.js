import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import DidButtons from './DidButtons';

// ICONS
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import HourglassEmpty from '@material-ui/icons/HourglassEmpty';


import HourglassFull from '@material-ui/icons/HourglassFull';
import School from '@material-ui/icons/School';
import Flight from '@material-ui/icons/Flight';
import CardTravel from '@material-ui/icons/CardTravel';
import EventAvailable from '@material-ui/icons/EventAvailable';
import ChildFriendly from '@material-ui/icons/ChildFriendly';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import LocalLibrary from '@material-ui/icons/LocalLibrary';
import MenuBook from '@material-ui/icons/MenuBook';
import Build from '@material-ui/icons/Build';
import LaptopChromebook from '@material-ui/icons/LaptopChromebook';
import Architecture from '@material-ui/icons/Apartment';
import ColorLens from '@material-ui/icons/ColorLens';
import HomeWork from '@material-ui/icons/HomeWork';
import EmojiObjects from '@material-ui/icons/EmojiObjects';
import EmojiEmotions from '@material-ui/icons/EmojiEmotions';
import ChatBubble from '@material-ui/icons/ChatBubble';
import Book from '@material-ui/icons/Book';

const POSTS_URL = 'http://127.0.0.1:8003/posts/';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  postSelected: {
    backgroundColor: "#90EE90",
    "&:hover": {
      cursor:"pointer"
    }
  },
  postCard: {
    "&:hover": {
      backgroundColor:"#FF9966",
      cursor:"pointer"
    }
  }
}));

const Categories = {
  "Art": <ColorLens />,
  "Programming": <LaptopChromebook />,
  "Engineering": <Build />,
  "Humanities": <MenuBook />,
  "Architecture": <Architecture />,
  "DIY": <HomeWork />,
  "Code": <LaptopChromebook />,
  "Miscellaneous": <HourglassFull />,

  "Graduation": <School />,
  "Certification": <CardTravel />,
  "Travel": <Flight />,
  "Life": <ChildFriendly />,
  "Event": <EventAvailable />,
  "Science": <LocalLibrary />,
  "Prize": <EmojiEvents />,

  "Opinion": <ChatBubble />,
  "Essay": <EmojiObjects />,
  "Joke": <EmojiEmotions />,
  "Blog": <Book />,
}


const Types = {
  "Artifact": "Did this",
  "Activity": "Lived this",
  "Text": "Sad this"
}



export default function Curriculum({userPosts, selectedPosts, addSelected}) {
  const classes = useStyles();

  //const [selectedPosts, setSelectedPosts] = useState([]);

  const [did, setDid] = useState(true);
  const [lived, setLived] = useState(true);
  const [said, setSaid] = useState(true);

  const pressButton = (type) => {
    switch (type) {
      case "Artifact":
        setDid(!did);
        break;
      case "Activity":
        setLived(!lived);
        break;
      case "Text":
        setSaid(!said);
        break;
    }
  }

function checkStatus(type) {
    switch (type) {
      case "Artifact":
        if(did) {return true} else{return false};
      case "Activity":
        if(lived) {return true} else{return false};
      case "Text":
        if(said) {return true} else{return false};
      default:
        return false;
    }
}

/*function addSelected(id) {
  if(selectedPosts.includes(id)){
    //remove
    setSelectedPosts(selectedPosts.filter(el => el !== id));
  }
  else {
    //add
    setSelectedPosts([...selectedPosts, id]);
  }
}*/

  const PostsTimeline = userPosts?.results?.map((item, counter) => {
      if(checkStatus(item.typePost)) {
      return <TimelineItem key={item.id}>
        <TimelineOppositeContent>
          <Typography variant="body2" color="textSecondary">
            {item.dateCreated}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color={counter%2 ? "primary" : "secondary"} variant={counter%2 ? "outlined" : "default"}>
          <Tooltip title={item.categories.length>0 ? item.categories : "Misc"}>
            {item.categories.length>0 & Object.hasOwn(Categories, item.categories) ? Categories[item.categories] : <HourglassEmpty />}
          </Tooltip>
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Paper elevation={3} className={selectedPosts.includes(item.id) ? [classes.postSelected] : classes.postCard} onClick={() => { addSelected(item.id);}} style={{padding:"6px 16px"}}>
            <Typography variant="h6" component="h1">
              <strong>{Types[item.typePost]}:</strong>
            </Typography>
            <Typography>{item.title}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    }

    return null;


  });

  return (

    <Paper elevation={1} style={{marginTop:"55px", background:"#FFFFFF"}}>
    <DidButtons pressButton={pressButton} did={did} lived={lived} said={said} />

    <Timeline align="alternate" style={{marginTop:"35px"}}>
      {PostsTimeline}
    </Timeline>
    </Paper>
  );
}

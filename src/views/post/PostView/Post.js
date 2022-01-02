import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Container,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Divider,
  SvgIcon,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';

import { Award as Artifact } from 'react-feather';
import { Send as Activity } from 'react-feather';
import { MessageCircle as Text } from 'react-feather';

import Toolbar from './Toolbar';
import FormMeta from './FormMeta';
import FormAssets from './FormAssets';
//import FormCategories from './FormCategories';
import FormCategories from './FormCategories';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavigationIcon from '@material-ui/icons/Navigation';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  userName: {
    fontWeight: 'bold',
    color:'#000000'
  },
  userPhoto: {
    borderRadius:'50%',
    marginRight:'10px',
  }
}));

const DB = 'http://localhost:5820/esco/query';

const query = `
select ?occupation where { 
?o a <http://data.europa.eu/esco/model#Occupation> .
?o <http://www.w3.org/2004/02/skos/core#prefLabel> ?occupation .
FILTER langMatches( lang(?occupation), "pt" )
} LIMIT 5
`;

const SERVER = DB + "?query=" + encodeURIComponent(query);


//STARDOG:
//A query pode ser http://localhost:5820/esco/query?query=xxx
//mas o xx tem de ser serialized com encodeURIComponent(xxx)
//ou a query no body post
//HEADERS:
//Basic Auth: admin / admin
//Para return de diferetnes formatos: (default: xml)
//accept / application/sparql-results+json


var timeInterval = 2000;
const examplesMaxSize = 7;

const textExamples = {
  didExamples: ["Painted 🖌", "Composed 🎤", "Published 🎓", "Filmed 🎥", "Built 🏡", "Wrote 📖", "Invented 🔧", "Cooked 🍪"],
  livedExamples: ["Graduated 🎓", "Won 🏆", "Experienced 👶", "Certfied 📚", "Scheduled 🏖", "Married 💍", "Moved 🔑", "Visited 🗿"],
  saidExamples: ["Thought 💭", "Teached 💡", "Announcing 📢", "Theorized 🔎", "Believe 💫", "Sketched 🗒", "Debating 🗣", "Advise 💬"]
}

const Post = ({ className, ...rest }) => {
  const classes = useStyles();

  //Hooks (States for Functions)
  const [formVar, setForm] = useState("did");
  const [examplesN, setExamplesN] = useState(0);
  const [examplesText, setExamplesText] = useState(textExamples.didExamples);

  //const [user, setUser] = useState({ name: "John Doe", age: 20 });

  const [count, setCount] = useState(0);

  //const formType = (arg) => setForm(arg);
  const formType = (arg) => {
      setForm(arg);
      setExamplesN(0);
      if (arg == "lived") {
        setExamplesText(textExamples.livedExamples);
      }
      else if (arg == "said") {
        setExamplesText(textExamples.saidExamples);
      }
      else {
        setExamplesText(textExamples.didExamples);
      }
  }

function timerCalc() {
    if (examplesN === examplesMaxSize) {
      setExamplesN(0);
    } else {
      setExamplesN(examplesN + 1);
    }
} 

function useInterval(callback, delay) {
  const intervalId = React.useRef(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  });
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalId.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalId.current);
    }
  }, [delay]);
  return intervalId.current;
}

useInterval(() => {
  timerCalc();
}, timeInterval);

  return (
    <Container maxWidth={false}>
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          mb={3}
          style={{position: 'relative'}}
        >
          <Avatar
            className={classes.userPhoto}
            alt="User Photo"
            src=""
            variant="square"
          />

            <Toolbar />

        </Box>

<Divider />

        <Grid style={{paddingTop: "10px"}}
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
          container
        >

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            aria-label="add"
            color={formVar=="did" ? "primary":"default"}
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('did')}
          >

            Did this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Artifact />
              </SvgIcon>
          </Fab>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            color={formVar=="lived" ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('lived')}
          >
            Lived this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Activity />
              </SvgIcon>
          </Fab>
          </Grid>

          <Grid item style={{paddingBottom: "20px"}}>
          <Fab
            variant="extended"
            size="small"
            color={formVar=="said" ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('said')}
          >
            Said this!&nbsp;<SvgIcon
                fontSize="small"
                //color="action"
              >
                <Text />
              </SvgIcon>
          </Fab>
          </Grid>
        </Grid>
      </CardContent>


      <Grid style={{marginTop: "20px", background:"#f4f6f8"}}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        container
      >
        <Grid item xs={6}>
            <Typography variant="overline" component="p" align="right">
              Things that I <strong>{formVar}</strong>:
            </Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography variant="overline" component="p" align="left">
        <strong>{examplesText[examplesN]}</strong> this!
        </Typography>
        </Grid>
      </Grid>
     
      <FormMeta />

      <FormCategories />
      
      <FormAssets />

      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="default"
          variant="contained"
          style={{marginRight:"15px"}}
        >
          Draft
        </Button>
        <Button
          color="primary"
          variant="contained"
        >
          Publish
        </Button>
      </Box>

    </Card>
    </form>
  </Container>
  );
};

Post.propTypes = {
  className: PropTypes.string,
};

export default Post;

import React, { useEffect, useState, createContext } from 'react';

//Lighter than Redux for form handling 
//import { Formik, Field, Form } from "formik";

import { useCallback } from 'react';

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


//FORM MAIN DATA
let formData = {

    user: 3,
    //user_token: '',
    //submition_datetime: '',

    //type: 'did',
    title: "",

    //description: '',
    body: "",
    thumbnail: "",
    typePost: "Artifact",
    typeId: 2,
    rate: "",
    dateCreated: "",
    //views: 0,
    privacy: "Public",

    when: "",
    where: "",
    for: "",

    assets: [],
    comments: [],

    jobs: [],
    skills: [],
    persons: [],
    tags: [],

  //key2: {...},
  //key3: [{...}, {...}],
}


const Post = ({ className, ...rest }) => {
  const classes = useStyles();

  //Hooks (States for Functions)
  const [formVar, setForm] = useState("Artifact");
  const [examplesN, setExamplesN] = useState(0);
  const [examplesText, setExamplesText] = useState(textExamples.didExamples);

  //const [user, setUser] = useState({ name: "John Doe", age: 20 });

  const [count, setCount] = useState(0);

  //const formType = (arg) => setForm(arg);
  const formType = (arg) => {
      setForm(arg);
      formData.type = arg;//updte formData
      setExamplesN(0);
      if (arg == "Activity") {
        setExamplesText(textExamples.livedExamples);
      }
      else if (arg == "Text") {
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


  // Callback function to communicate bettween parent and child component
  const updateForm = useCallback((field, value) => {
    formData[field] = value;
  }, []);


// Convert a JSON Object to a formData
function toFormData(o) {
  /*const formData = new FormData();
  Object.entries(o).forEach(([key, value]) => {
      formData.append(key, value);
  });
  return formData;*/
  return Object.entries(o).reduce((d,e) => (d.append(...e),d), new FormData())
}



  const handleSubmit = (event) => {
    event.preventDefault();


    const today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    formData.dateCreated = date;
    alert(formData);


    //let data = toFormData(formData); // creates a new FormData

    //alert(JSON.stringify(formData));
    alert( JSON.parse(JSON.stringify(formData)) );

    //data.append("image", this.state.image); // add data to form data


    const SERVER = 'http://127.0.0.1:8003/posts/';
    const requestOptions = {
        method: 'POST',
        headers: { 
          //'Authorization': 'Basic '+btoa('paulo:unicornio'),
          //'X-CSRFToken': 'gTiPlygvqXHH3NEDOO23x9yhVUAv2MvOkMKH3wdPKjh3tYfjqeaqACLU74uOcGxu',
          //'Accept': 'application/json',
          //'Content-Type': 'multipart/form-data',
          //credentials: 'same-origin',
          'Authorization': 'Basic cGF1bG86dW5pY29ybmlv',
          'Content-Type': 'application/json',
          //'accept': 'application/json',
          //'X-CSRFToken': 'arzDs3SqGp1gkqe9dtFxu8PSSSQVhf6zo2U70ahoVrectrFbFpFbwiI41u9o6yPo'

        },
        body: JSON.stringify(formData)
    };

    fetch(SERVER, requestOptions)
    .then(function(response) {
      //if(response.status == 201) {
      if (response.ok) {
        alert("Enviado");
      }
      else {
        //alert(JSON.stringify(formData));
        //alert( response.statusText)
        alert("Failed - Try again");
      }
    })
    .catch(error => alert("Error - Refresh page and try again"));



      //.then(response => alert( JSON.stringify(response.json()) ) )
      //.catch(error => alert(error));




      //.then(response => response.text())
      //.then(data => this.setState({ postsData: data, isLoading: false }))
      //.catch(error => this.setState({ error, isLoading: false }));
      
      //console.log(err)

    /*fetch(SERVER)
      .then(response => response.text())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));*/


  }







  return (
    <Container maxWidth={false}>
    <form
      onSubmit={handleSubmit}
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

            <Toolbar
              updateForm={updateForm}
            />

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
            color={formVar=="Artifact" ? "primary":"default"}
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('Artifact')}
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
            color={formVar=="Activity" ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('Activity')}
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
            color={formVar=="Text" ? "primary":"default"}
            aria-label="add"
            style={{paddingLeft:'15px',paddingRight:'15px'}}
            onClick={() => formType('Text')}
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
     
      <FormMeta 
        updateForm={updateForm}
      />

      <FormCategories
        formData={formData}
        updateForm={updateForm}
      />
      
      <FormAssets
        formData={formData}
        updateForm={updateForm}
      />

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
          type="submit"
        
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

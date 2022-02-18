import React, { useEffect, useState, createContext } from 'react';

//Lighter than Redux for form handling 
//import { Formik, Field, Form } from "formik";
import { Navigate } from "react-router-dom";
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


//FORM MAIN DATA
let formData = {

    user: 1,
    //user_token: '',
    //submition_datetime: '',

    //type: 'did',
    title: "",

    //description: '',
    body: "",
    thumbnail: [],//{id:"1", user:"1", fName:"xxx.jpg", fLink:"", fType:"Image", originalName:"xx"} / to view use thumbnail[0] to filter abuses
    typePost: "Artifact",//Artifact / Activity / Text
    typeId: 2,
    rate: "",
    //dateCreated: "",
    //views: 0,
    privacy: "Public",

    when: "",
    where: "",
    for: "",

    assets: [],//Format: {id:"1", user:"1", fName:"xxx.jpg", fLink:"", fType:"Image", originalName:"xx"}
    comments: [],

    jobs: [],
    skills: [],
    persons: [],
    categories: [],
}



const Post = ({ className, ...rest }) => {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(null);

  /*function urlParams() {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    const hasTypePost = params.has("typePost");
    const t = params.get("typePost");
    alert(params);
  }

  const type = urlParams();*/


  // When form submit and redirect to wall, when geting back the data is still the same in the old form
  // So reset when triggering the redirect
  function resetFormData() {
    formData = {
      user: 1,
      title: "",
      body: "",
      thumbnail: [],
      typePost: "Artifact",
      typeId: 2,
      rate: "",
      privacy: "Public",
      when: "",
      where: "",
      for: "",
      assets: [],
      comments: [],
      jobs: [],
      skills: [],
      persons: [],
      categories: [],
    }
  }

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
    //const today = new Date();
    //let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    //formData.dateCreated = date;


    //let data = toFormData(formData); // creates a new FormData

    //alert(JSON.stringify(formData));
    //alert( JSON.parse(JSON.stringify(formData)) );

    //data.append("image", this.state.image); // add data to form data


    const SERVER = 'http://127.0.0.1:8003/posts/';
    const requestOptions = {
        method: 'POST',
        headers: { 
          //'Authorization': 'Basic '+btoa('paulo:admin'),
          //'X-CSRFToken': 'gTiPlygvqXHH3NEDOO23x9yhVUAv2MvOkMKH3wdPKjh3tYfjqeaqACLU74uOcGxu',
          //'Accept': 'application/json',
          //'Content-Type': 'multipart/form-data',
          //credentials: 'same-origin',
          //'Authorization': 'Basic cGF1bG86dW5pY29ybmlv',
          'Authorization': 'Basic '+global.config.AUTH.POSTS.token,
          'Content-Type': 'application/json',
          //'accept': 'application/json',
          //'X-CSRFToken': 'arzDs3SqGp1gkqe9dtFxu8PSSSQVhf6zo2U70ahoVrectrFbFpFbwiI41u9o6yPo'

        },
        body: JSON.stringify(formData)
    };

    fetch(SERVER, requestOptions)
    .then(response => response.json())
    .then(data => {

      var graph_json = {};

      graph_json["id"] = data["id"]
      graph_json["sourceUrl"] = "http://localhost:3000/#/posts/"+data.id;
      graph_json["typePost"] = data["typePost"];
      graph_json["user"] = data["user"];
      graph_json["userName"] = "Paulo Martins";
      graph_json["dateCreated"] = data["dateCreated"];
      graph_json["title"] = data["title"];
      graph_json["body"] = data["body"];

      let s = JSON.stringify(data.skills)
      let j = JSON.stringify(data.jobs)
      let f = data.for
      let w = data.where

      //graph_json["text"] = data.title + " " + data.body + " " + JSON.stringify(data.jobs) + " " + JSON.stringify(data.skills) + " " + data.for + " " + data.where;
      graph_json["text"] = data.title + " " + data.body

      if (s != "[]") {
        graph_json["text"] = graph_json["text"] + " " + s
      }
      if (j != "[]") {
        graph_json["text"] = graph_json["text"] + " " + j
      }
      if (f != null) {
        graph_json["text"] = graph_json["text"] + " " + f
      }
      if (w != null) {
        graph_json["text"] = graph_json["text"] + " " + w
      }

      graph_json["year"] = data.dateCreated.split("-")[0];

      var graph_array=[graph_json];

      //data["sourceUrl"] = "http://localhost:3000/#/posts/"+data.id
      //data["text"] = data.title + " " + data.body + " " + JSON.stringify(data.jobs) + " " + JSON.stringify(data.skills) + " " + data.for + " " + data.where
      //data["userName"] = "Paulo"
      //data["year"] = data.dateCreated.split("-")[0]
      



      //alert(JSON.stringify(data));

      //SEND FOR Entigraph->RABITMQ->Python ontology generation
        fetch("http://localhost:3888/amqp", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(graph_array)
        })
        /*.then(function(response) {
          if(response.status == 201) {
            console.log("Sent for AMQP Entigraph")
          }
        }
        .catch(error => alert("Error - Refresh page and try again"))*/

      setRedirect("/wall")
    })
    /*.then(function(response) {
      //if(response.status == 201) {
      if (response.ok) {
        //alert("Enviado");
        //const navigate = useNavigate();
        //navigate.push("/wall");
        setRedirect("/wall");
      }
      else {
        //alert(JSON.stringify(formData));
        //alert( response.statusText)
        alert("Failed - Try again");
      }
    })*/
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




  if (redirect) {
    {resetFormData()}
    return <Navigate to={redirect} />
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

      <Toolbar
        formData={formData}
        updateForm={updateForm}
      />
     
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

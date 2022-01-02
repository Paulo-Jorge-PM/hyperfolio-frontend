import React, { Component } from 'react';
 import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import PostCard from './PostCard';


//const API = 'https://hn.algolia.com/api/v1/search?query=redux';
//const API = 'http://10.0.2.2:8080/auth/';
var django_server='http://10.0.3.2/8080/auth';
var rust_server ='http://127.0.0.1:8002';
var apigateway ='http://127.0.0.1:8000';

const SERVER = 'http://127.0.0.1:8080/posts';
//Android emulator local ip:
//const SERVER = 'http://10.0.2.2:8080/posts';
 

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: "",
      postsData: "",
      isLoading: true,
      error: null,
    };
  }
 
  componentDidMount() {
    this.setState({ isLoading: true });
 
    /*fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ data: data.data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));*/

    fetch(SERVER, {
        method: 'GET', 
        //headers: new Headers({
        headers: {
          //'Authorization': 'Basic '+btoa('paulo:unicornio'),
          'Authorization': 'Basic cGF1bG86dW5pY29ybmlv',
          //'X-CSRFToken': 'gTiPlygvqXHH3NEDOO23x9yhVUAv2MvOkMKH3wdPKjh3tYfjqeaqACLU74uOcGxu',
          //'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, 
        /*body: JSON.stringify({
          'client_id': '(API KEY)',
          'client_secret': '(API SECRET)',
          'grant_type': 'client_credentials'
          })*/
      })
      //.then(response => response.text())
      .then(response => response.json())
      .then(data => this.setState({ postsData: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    /*fetch(SERVER)
      .then(response => response.text())
      .then(data => this.setState({ data: data, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));*/


  }


 
  render() {
    const { postsData, isLoading, error } = this.state;
 
    if (error) {
      return <p>{error.message}</p>;
    }
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }
 
    return (
    

    <Page
      title="Posts"
    >
      <Container maxWidth={false} style={{backgroundColor:"red"}}>
        
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {postsData.results.map((post) => (
              <Grid
                item
                key={post.id}
                lg={4}
                md={6}
                xs={12}
              >
                <PostCard
                  post={post}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>




      /*<ul>
        {postsData.results.map(item =>
          <li key={item.id}>
            <a href="http://www.google.pt">{item.title}</a>
          </li>
        )}
      </ul>*/

      /*<h1>
      {serverData.map(post =>
        <p>{post.id}</p>
      )}
      </h1>*/
      /*<h1>Print data: {JSON.stringify(postsData)}</h1>*/
    );
  }

}

export default App;
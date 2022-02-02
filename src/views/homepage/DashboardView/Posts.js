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

const POSTS = 'http://127.0.0.1:8003/posts/';

const SERVER = POSTS;

//const SERVER = 'http://127.0.0.1:8080/posts';
//Android emulator local ip:
//const SERVER = 'http://10.0.2.2:8080/posts';

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      postsData: [],
      error: null,
      page: 0,
      currentY: 0,
      loading: false,
      nextPage: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
 


  getData(first) {
    //set first default value
    first = (typeof first !== 'undefined') ? first : false;

    if (this.state.nextPage != false & this.state.loading != true){
      const pagination = this.state.page+1;
      this.setState({ page: pagination });
      this.setState({ loading: true });

      fetch(SERVER+'?page='+pagination.toString(), {
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
        
        /*.then(res => {
          //this.setState({ postsData: [...this.state.postsData, ...res] });
          this.setState({ postsData: res.json() });
          this.setState({ loading: false });
        });*/

        .then(response => response.json())
        //.then(data => this.setState({ postsData: [...this.state.postsData, ...data], loading: false }) & alert(JSON.stringify(data) ))
        .then(data => {
          //this.setState({ postsData: [...this.state.postsData, ...data.results], loading: false });
          this.setState({ postsData: [...this.state.postsData, ...data.results] });
          this.setState({ loading: false });
          if (data.next == null) {
            this.setState({ nextPage: false });
          }
        })
        //.then(data => { alert( JSON.stringify(this.state.postsData) ) })
        .catch(error => this.setState({ error, loading: false }));
    }
  }




  handleScroll() {
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight); //in case content is smaller than the window res AND cross comp
    //const docHeight = document.body.scrollHeight;
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const windowBottom = windowHeight + window.pageYOffset;
    const threshold = 50; //value bottom margin px to start load activation; zero for no margin

    if ( (docHeight > windowHeight) & (windowBottom >= (docHeight-threshold) ) ) {
      this.getData(false);
      // Show loading spinner and make fetch request to api
      // xx
    }
  }

  componentDidMount() {
    
    this.getData(true);
    
    window.addEventListener("scroll", this.handleScroll);

  }


componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
}



renderList(postsData) {
    const data = postsData;
    let content = "";
      if (data.length!=0) {
        content = data.map((post) => (
              <Grid
                key={post.id.toString()}
                item
                lg={12}
                md={12}
                xs={12}
                className='post'
              >
                <PostCard
                  post={post}
                />
            
              </Grid>
          ))
    }
    return content;
}


  render() {
    const { postsData, loading, error } = this.state;

    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    /*if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }
 
    if (this.state.loading) {
      return <p>Loading ...</p>;
    }*/





 
    return (
    

    <Page
      title="Posts"
    >
      <Container maxWidth={false}>
        
        <Box mt={3}>

          <Grid
            container
            spacing={3}
          >

          {this.renderList(this.state.postsData)}

          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >

          {/* <Pagination
            color="primary"
            count={3}
            size="small"
          /> */}

        </Box>

        <div
          ref={loadingRef => (this.loadingRef = loadingRef)}
          style={loadingCSS}
        >
          <p style={loadingTextCSS}><strong>Loading...</strong></p>
          <p style={{ textAlign:"center" }}><img alt="Loading" src="./static/images/loading.gif" style={{width:"50px",height:"50p"}} /></p>
        </div>

      </Container>
    </Page>
    );
  }

}

export default App;
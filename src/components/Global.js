import React from 'react';

// To import do: 
//import Global from 'src/components/Global';

const Global = () => {
  const ENDPOINTS = {
    'posts': 'http://127.0.0.1:8003/posts/',
    'assets': '',
    'static': 'http://127.0.0.1:8003/static/',
    'aseets': 'http://127.0.0.1:8003/static/aseets/',
    'apigateway': 'http://127.0.0.1:8000/',
    'rust_server': 'http://127.0.0.1:8002/',


  }

  const AUTH = {
    'user': 'paulo',
    'pass': 'admin',
    'token': 'cGF1bG86YWRtaW4='
  }


  return null;
};

export default Global;

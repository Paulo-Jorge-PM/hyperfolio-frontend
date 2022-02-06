// How to use:
// Import it in the main index.js of the App: import './config';
// Then use it from any component with e.g. alert(global.config.ENDPOINTS.posts)

module.exports = global.config = {
    ENDPOINTS: {
    'posts': 'http://127.0.0.1:8003/posts/',
    'assets': 'http://127.0.0.1:8003/static/assets/',
    'static': 'http://127.0.0.1:8003/static/',
    'aseets': 'http://127.0.0.1:8003/static/aseets/',
    'apigateway': 'http://127.0.0.1:8000/',
    'rust_server': 'http://127.0.0.1:8002/',
    },
    
    
    AUTH: {
        POSTS: {
            'user': 'paulo',
            'pass': 'admin',
            'token': 'cGF1bG86YWRtaW4='
        },
        STARDOG: {
            'user': 'admin',
            'pass': 'admin'
        }
    }
};

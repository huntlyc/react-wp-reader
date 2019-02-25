import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';

import LatestBlogPosts from './LatestBlogPosts';
import Post from './Post';

import './App.css';


export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            endpoint: '',
            curPostSlug: null
        }

        this.lsKey = 'huntlyc-react-wp-reader';
    }

    componentDidMount(){
        if(localStorage.getItem(this.lsKey)){
            const savedState = JSON.parse(localStorage.getItem(this.lsKey));

            this.setState(savedState);
        }
    }

    updateEndpoint = (e) => {
        e.preventDefault();

        const curEndpoint = this.state.endpoint;

        let userEndpoint = document.getElementById('endpoint').value;
        userEndpoint = "" + userEndpoint;
        userEndpoint.trim();

        if(curEndpoint !== userEndpoint){
            this.setState({
                endpoint: userEndpoint,
                curPostSlug: null, //reset curPostSlug to trigger <LatestBlogPosts/> 
            });
    
            localStorage.setItem(
                this.lsKey, 
                JSON.stringify({
                    "endpoint": userEndpoint
                })
            );
        }

    }

    renderEnpointInput = () => {
        return (

            <form action="/" className="endpoint-form" onSubmit={this.updateEndpoint}>
                <label htmlFor="endpoint">Wordpress URL:</label>
                <input id="endpoint" name="endpoint" type="url" placeholder="https://www.huntlycameron.co.uk" defaultValue={this.state.endpoint}/><button>Change</button>
            </form>
        )   
    }

    handleViewPost = (postSlug) =>{
        this.setState({
            curPostSlug: postSlug
        });
    }

    renderInnerContent = () => {
        if(this.state.endpoint === ''){
            return <p className="text-center highlight">Please enter a URL to start!</p>
        }

        return(
            <Router>
                <div>
                    <Route exact path="/" render={(props) =>  <LatestBlogPosts {...props} endpoint={this.state.endpoint}  /> } />
                    <Route path="/:slug" render={(props) => <Post {...props} endpoint={this.state.endpoint} />} />
                </div>
            </Router>
        )
    }



    render() {
        
        return (
            <React.Fragment>
                <header>
                    <h1>WP Blog Reader</h1>
                    <p>Pulls blog posts from a REST enabled WordPress blog.</p>
                    {this.renderEnpointInput()}
                </header>
                <main>
                    {this.renderInnerContent()}
                </main>
                <footer>Made with <span className="heart">&#9829;</span> by <a href="https://www.huntlycameron.co.uk/" rel="noopener noreferrer" target="_blank">huntlyc</a></footer>
            </React.Fragment>
        );
    }
}

export default App;

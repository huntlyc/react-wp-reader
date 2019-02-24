import React from 'react';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import LatestBlogPosts from './LatestBlogPosts';
import Post from './Post';

import './App.css';


export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            endpoint: ''
        }
    }

    updateEndpoint = (e) => {
        e.preventDefault();

        let userEndpoint = document.getElementById('endpoint').value;
        userEndpoint = "" + userEndpoint;
        userEndpoint.trim();
        this.setState({
            endpoint: userEndpoint
        });

    }

    renderEnpointInput = () => {
        return (

            <form action="/" className="endpoint-form" onSubmit={this.updateEndpoint}>
                <label htmlFor="endpoint">Wordpress URL:</label>
                <input id="endpoint" name="endpoint" type="url" placeholder="https://www.huntlycameron.co.uk" /><button>Change</button>
            </form>
        )   
    }

    renderInnerContent = () => {
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
                    {this.state.endpoint === '' ? this.renderEnpointInput() : <p>Pulling content from <strong>{this.state.endpoint}</strong></p>}
                </header>
                <main>
                    {this.state.endpoint !== '' ? this.renderInnerContent() : <p className="text-center highlight">Please enter a URL to start!</p>}
                </main>
                <footer>Made with <span className="heart">&#9829;</span> by <a href="https://www.huntlycameron.co.uk/" rel="noopener noreferrer" target="_blank">huntlyc</a></footer>
            </React.Fragment>
        );
    }
}

export default App;

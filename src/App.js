import React from 'react';

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
        }

    }

    renderEnpointInput = () => {
        return (

            <form action="/" className="endpoint-form" onSubmit={this.updateEndpoint}>
                <label htmlFor="endpoint">Wordpress URL:</label>
                <input id="endpoint" name="endpoint" type="url" placeholder="https://www.huntlycameron.co.uk" /><button>Change</button>
            </form>
        )   
    }

    handleViewPost = (postSlug) =>{
        this.setState({
            curPostSlug: postSlug
        });
    }

    renderInnerContent = () => {

        //If no endpoint show start msg
        if(this.state.endpoint === ''){
            return <p className="text-center highlight">Please enter a URL to start!</p>
        }

        //If no slug, show latest post list
        if(this.state.curPostSlug === null){
            return <LatestBlogPosts endpoint={this.state.endpoint} handleViewPost={this.handleViewPost} />
        }else{
            return <Post endpoint={this.state.endpoint} slug={this.state.curPostSlug} handleViewPost={this.handleViewPost} />
        }

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

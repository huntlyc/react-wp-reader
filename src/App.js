import React from 'react';
import './App.css';
import AppContent from './AppContent';


export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            validEndpoint: false,
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

    render() {
        return (
            <React.Fragment>
                <header>
                    <h1>WP Blog Reader</h1>
                    <p>Pulls blog posts from a REST enabled WordPress blog.</p>
                    <form action="/" className="endpoint-form" onSubmit={this.updateEndpoint}>
                        <label htmlFor="endpoint">Wordpress URL:</label>
                        <input id="endpoint" name="endpoint" type="url" placeholder="https://www.huntlycameron.co.uk" /><button>Change</button>
                    </form>
                </header>
                {this.state.endpoint !== '' ? <AppContent endpoint={this.state.endpoint} /> : <p>Please enter a URL</p>}
                <footer>Made with <span className="heart">&#9829;</span> by <a href="https://www.huntlycameron.co.uk/" rel="noopener noreferrer" target="_blank">huntlyc</a></footer>
            </React.Fragment>
        );
    }
}

export default App;

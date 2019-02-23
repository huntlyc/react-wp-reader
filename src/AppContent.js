import React, { Component } from 'react';
export class AppContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            greeting: 'World'
        };
    }
    componentDidMount() {
        this.setState({
            greeting: 'Huntly'
        });
    }
    render() {
        return (<main>
            <h1>Hello, {this.state.greeting}</h1>
        </main>);
    }
}

export default AppContent;
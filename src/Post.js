import React from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom';

class Post extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fetchingPost: true,
            encounteredError: false,
            title: null,
            content: null
        }
    }

    componentDidMount(){
        axios
            .get(this.props.endpoint + '/wp-json/wp/v2/posts/?slug=' + this.props.match.params.slug)
            .then((response) => {
                if (response && response.status === 200 && response.data) {
                    const data = response.data[0];
                    this.setState({
                        title: data.title.rendered,
                        content: data.content.rendered
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    encounteredError: true
                })
            }).finally(() => {
                this.setState({
                    fetchingPost: false
                })
            });
    }

    backToMain = (e) =>{
        e.preventDefault();
        this.props.handleViewPost(null);
    }

    render(){

        let content;
        let noContent = '';
        let noContentClass = ''
        //Check if fetching 
        if (this.state.fetchingPost) {
            noContentClass = 'text-center highlight';
            noContent = "Fetching post" + String.fromCharCode(8230);
        }

        //Check for error loading content and bail
        if (this.state.encounteredError) {
            noContentClass = 'error';
            noContent = "Couldn't load post at this time" + String.fromCharCode(8230);
        }

        if (noContent !== '') {
            content = <p className={noContentClass}>{noContent}</p>
        } else {
            content = <React.Fragment><h1 dangerouslySetInnerHTML={{__html: this.state.title }} /><div className="articleContent" dangerouslySetInnerHTML={{__html: this.state.content }} /></React.Fragment>
        }

        return (
            <article>
                {content}
                {/* <a href="#viewall" onClick={this.backToMain} className="btn">Back to posts</a> */}
                <Link to="/" className="btn">Back to posts</Link>
            </article>
        )
        
    }
}

export default Post;
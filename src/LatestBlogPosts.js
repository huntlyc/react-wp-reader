import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
class LatestBlogPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            fetchingPosts: false,
            encounteredError: false

        }
        
        this.handleLoadPost = this.handleLoadPost.bind(this);
    }

    
    componentDidMount() {
        this.setState({
            fetchingPosts: true
        });

        axios
            .get( this.props.endpoint + '/wp-json/wp/v2/posts/')
            .then((response) => {
                if (response && response.data) {
                    this.setState({
                        posts: response.data
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    encounteredError: true
                })
            }).finally(() => {
                this.setState({
                    fetchingPosts: false
                })
            });
    }


    renderPostSummaries() {
        const posts = this.state.posts.map((post, index) => {
            return (
                <PostSummary key={index} post={post} handleLoadPost={this.handleLoadPost} />
            )
        });

        return (
            <React.Fragment>
                {posts}
            </React.Fragment>
        );
    }


    handleLoadPost(e, postID){
        this.props.handleLoadPost(e, postID); //Pass up
    }
    

    render() {
        let noPostsContent = '';
        let noPostsClassName = '';

        //Check if fetching 
        if (this.state.fetchingPosts) {
            noPostsContent = "Fetching posts" + String.fromCharCode(8230);
        }

        //Check for error loading content and bail
        if (this.state.encounteredError) {
            noPostsClassName = 'error';
            noPostsContent = "Couldn't load posts at this time from " + this.props.endpoint + String.fromCharCode(8230);
        }

        if (noPostsContent !== '') {
            return <p className={noPostsClassName}>{noPostsContent}</p>
        } else {
            return (
                <ul className="latest-posts">
                    {this.renderPostSummaries()}
                </ul>
            );
        }

    }
}


class PostSummary extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSummaryVisible: false,
        };

        this.toggleSummary = this.toggleSummary.bind(this);
    }

    toggleSummary(e){
        e.preventDefault();
        const isSummaryVisible = !this.state.isSummaryVisible;
        this.setState({
            isSummaryVisible: isSummaryVisible
        });
    }

    handleReadMore = (e) => {
        e.preventDefault();
        this.props.handleLoadPost(this.props.post.id)
    }

    render(){
        const post = this.props.post;
        return(
            <li key={post.id}>
                <a href={post.link} onClick={this.toggleSummary} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                {this.state.isSummaryVisible && 
                    <React.Fragment>
                        <p dangerouslySetInnerHTML={{__html: post.excerpt.rendered }}/> 
                        <Link to={post.slug} className="btn">Read More</Link>
                    </React.Fragment>
                }
            </li>
        )
    }
}


export default LatestBlogPosts;
import React from 'react';
import axios from 'axios';
class LatestBlogPosts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            fetchingPosts: true,
            encounteredError: false

        }   

        
    }

    
    componentDidMount() {
        this.getLatestPosts();
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        //Only request new posts if endpoint has changed
        if(prevProps.endpoint !== this.props.endpoint){
            this.setState({
                fetchingPosts: true,
            })
            this.getLatestPosts();
        }
    }

    getLatestPosts(){
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

    handleViewPost = (slug) =>{
        this.props.handleViewPost(slug);
    }


    renderPostSummaries() {
        const posts = this.state.posts.map((post, index) => {
            return (
                <PostSummary key={post.slug} post={post} handleViewPost={this.props.handleViewPost} />
            )
        });

        return (
            <React.Fragment>
                {posts}
            </React.Fragment>
        );
    }



    render() {
        let noPostsContent = '';
        let noPostsClassName = '';

        //Check if fetching 
        if (this.state.fetchingPosts) {
            noPostsClassName='text-center highlight';
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

    handleViewPost = (e) =>{
        e.preventDefault();
        this.props.handleViewPost(this.props.post.slug);
    }
    render(){
        const post = this.props.post;
        return(
            <li>
                <a href={post.link} onClick={this.toggleSummary} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                {this.state.isSummaryVisible && 
                    <div className="summary">
                        <div className="excerpt" dangerouslySetInnerHTML={{__html: post.excerpt.rendered }}/> 
                        <a href="#viewpost" className="btn" onClick={this.handleViewPost} >Read More</a>
                    </div>
                }
            </li>
        )
    }
}


export default LatestBlogPosts;
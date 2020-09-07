import React from 'react'
import {Link} from 'react-router-dom'

function Greeting(props){
    return(
        <div>
            <a href='/newpost'>New post</a>
            
            {!props.user ? <a href='/login'>Log in</a> : <a href='/' onClick={props.logout}>Log out</a>}
            {!props.user ? <p>Welcome to my blog! You're a guest, please log in to add posts</p> : <p>You have admin rights.</p>}
            <ul>
                {props.posts.map(post => <li key={post.id}>{post.title} - {post.text}</li>)}
            </ul>
        </div>
    )
}

export default Greeting
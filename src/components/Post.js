import React from 'react'
import {Redirect} from 'react-router-dom'

function Post(props){
    if(props.user){
        return(
            <div>
                <form onSubmit={props.postToDb}>
                    <label>Title</label>
                    <input name='title' value={props.title} onChange={props.handleTitle}/>
                    <label>New post</label>
                    <textarea name='text' value={props.post} rows='10' cols='50' onChange={props.handlePost}/>
                    <button type='submit'>Post it</button>
                </form>
            </div>
            
        )
    }else{
        return(
            <div>
                <p>You're unauthorized to post</p>
            </div>
        )
    }
    
}

export default Post
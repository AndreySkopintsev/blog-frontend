import React from 'react'

function Greeting(props){
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
}

export default Greeting
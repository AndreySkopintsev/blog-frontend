import React from 'react'

function Post(props){
    return(
        <div className='postContainer'>
            {props.post.title}
        </div>
    )
}

export default Post
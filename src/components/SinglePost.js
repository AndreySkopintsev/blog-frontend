import React from 'react'



const SinglePost = (props)=>{

    
    let postDate = new Date(props.post.date)
    console.log(postDate)
    let comments = []
    if(props.post.comments){
    comments = props.post.comments.map(comment => {
        const mongoDate = new Date(comment.date)
        const commentDate = mongoDate.toLocaleDateString() 
        return <li key={comment._id}>{comment.text} - {comment.author} - {commentDate}</li>
    })
    }

    return(
        <div>
            <h2>{props.post.title}</h2>
            <p>{props.post.text}</p>
            <p>{postDate.toLocaleDateString()}</p>
            <h3>Comments:</h3>
            <ul>
                {comments}
            </ul>
        </div>
    )
}

export default SinglePost 
import React from 'react'


function Form(props){
    
    return(
        <div>
            <p>Please log in in order to create new posts</p>
            <form onSubmit={props.getToken}>
                <label>Email</label>
                <input name='email' type='text' value={props.email} onChange={props.handleEmailChange} />
                <label>Password</label>
                <input name='password' type='password' value={props.password} onChange={props.handlePasswordChange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
    
}

export default Form
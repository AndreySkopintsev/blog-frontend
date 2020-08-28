import React from 'react';
import axios from 'axios';
import {Switch,Route,Redirect} from 'react-router-dom'
import Post from './components/Post'
import {useState,useEffect} from 'react';
import Form from './components/Form'
import Greeting from './components/Greeting'

const url = 'http://localhost:3001/'



function App() {

  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [post,setPost] = useState('')
  const [title,setTitle] = useState('')

  //Handling the authentication and getting the token back
  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }

  const handleEmailChange = (e) =>{
    setEmail(e.target.value)
  }

  const getToken = (e) =>{
    e.preventDefault()
    
    const userAuth = {
      user:email,
      password:password
    }

    axios.post(`${url}user/login`,userAuth)
      .then(res => {
        console.log(res.data.token)
        setToken(res.data.token)
      })

      setPassword('')
      setEmail('')
  }

  const showToken = () =>{
    console.log(token)
  }

  //Post manipulations

  const handlePostChange = (e) =>{
    setPost(e.target.value)
    console.log(post)
  }

  const handleTitleChange = (e) =>{
    setTitle(e.target.value)
    console.log(title)
  }

  const postToDb = (e) =>{
    e.preventDefault()

    const newPost = {
      title:title,
      text:post
    }

    axios.post(`${url}api/posts`,newPost,{headers:{'Authorization':`Bearer ${token}`}})
      .then(res => {
        console.log(res)
      })

  }


  return(
    <div className='container'>
      <Switch>
        <Route exact={true} path='/'>
          {<Greeting />}
        </Route>
        <Route path='/login' >
          {
            !token ? 
            <Form 
              email={email} 
              password={password}
              getToken={getToken}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
              showToken={showToken}
            />
            :
            <Redirect to='/newpost'/>
          }
        </Route>
        <Route path='/newpost'>
        {
          <Post 
            token={token}
            handleTitle={handleTitleChange}
            handlePost={handlePostChange}
            postToDb={postToDb}
            title={title}
            post={post}
          />
        }
        </Route>
      </Switch>
    </div>
  )
}

export default App;

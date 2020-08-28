import React from 'react';
import axios from 'axios';
import Post from './components/Post'
import {useState,useEffect} from 'react';
import Form from './components/Form'
import Greeting from './components/Greeting'

const url = 'http://localhost:3001/'



function App() {

  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDBmODJiYzEyMDI4MWM2MGFiMWI0MiIsImVtYWlsIjoic2tvcGludHNldkBlbWFpbC5jb20iLCJpYXQiOjE1OTgyNzI3OTl9.lW55_zPJ-598Cj1ddePfTyOSvjlH8IRhznuB7mV6mg8')
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


  if(!token){
    return (
      <div className='container'>
        <Form
          email={email}
          password={password}
          getToken={getToken}
          handleEmailChange={handleEmailChange}
          handlePasswordChange={handlePasswordChange}
          showToken={showToken}
        />
      </div>
    );
  }else{
    return(
      <div className='container'>
        <Greeting 
          handleTitle={handleTitleChange}
          handlePost={handlePostChange}
          postToDb={postToDb}
          title={title}
          post={post}
        />
      </div>
    )
  }
}

export default App;

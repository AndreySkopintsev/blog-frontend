import React from 'react';
import axios from 'axios';
import {Switch,Route,Redirect, useHistory} from 'react-router-dom'
import Post from './components/Post'
import {useState,useEffect} from 'react';
import Form from './components/Form'
import Greeting from './components/Greeting'
import blogService from './services/blogs'

const url = 'http://localhost:3001/'



function App() {

  const history = useHistory()
  const [user,setUser] = useState('')
  const [blogPosts,setPosts] = useState([])
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [post,setPost] = useState('')
  const [title,setTitle] = useState('')


  useEffect(()=>{
    blogService.getAll()
      .then(initialPosts => {
        setPosts(initialPosts)
      })
  },[])

  useEffect(()=>{
    const userInfo = window.localStorage.getItem('UserToken')
    if(userInfo){
      const user = JSON.parse(userInfo)
      blogService.setToken(user.token)
      setUser(user.user)
    }
  },[])

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
        console.log(res.data)
        setUser(res.data.user)
        window.localStorage.setItem('UserToken',JSON.stringify({user:res.data.user,token:res.data.token}))
        blogService.setToken(res.data.token)
      })

      setPassword('')
      setEmail('')
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

    // axios.post(`${url}api/posts`,newPost,{headers:{'Authorization':`Bearer ${token}`}})
    //   .then(res => {
    //     console.log(res)
    // })
    blogService.postNew(newPost)
    history.push('/')
  }

  //Log out function

  const logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('UserToken')
    blogService.setToken(null)
    setUser('')
  }


  return(
    <div className='container'>
      <Switch>
        <Route path='/login' >
          {
            !user ? 
            <Form 
              email={email} 
              password={password}
              getToken={getToken}
              handleEmailChange={handleEmailChange}
              handlePasswordChange={handlePasswordChange}
            />
            :
            <Redirect to='/'/>
          }
        </Route>
        <Route path='/newpost'>
        {
          <Post 
            user={user}
            handleTitle={handleTitleChange}
            handlePost={handlePostChange}
            postToDb={postToDb}
            title={title}
            post={post}
          />
        }
        </Route>
        <Route path='/'>
          {<Greeting 
            user={user}
            logout={logout}
            posts={blogPosts}
          />}
        </Route>
      </Switch>
    </div>
  )
}

export default App;

import axios from 'axios'
const url = 'http://localhost:3001/api/posts'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () =>{
    
    return axios.get(url).then(response => response.data)
}

const postNew = (newPost) =>{
    axios.post(url,newPost,{headers:{'Authorization':token}})
      .then(res => {
        return res.data
    })

}

export default {setToken,postNew,getAll}
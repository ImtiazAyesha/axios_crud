import { useEffect, useState } from "react"
import { getPost, deletePost } from "../api/PostApi"
import {Form} from "../components/Form"
import "../App.css"
export const Post=()=>{
    const [data,setData] = useState([])
    const [updataData, setUpdataData] =useState({})
    const getPostData= async ()=>{
        const res = await getPost();
        setData(res.data)
        console.log(res.data)
    }

    useEffect(()=>{
        getPostData()
    },[])

   const handleDelete= async(id)=>{
    try {
        const res = await deletePost(id)
        if(res.status === 200){
            const updatedData = data.filter((curPost)=>{
                return curPost.id !== id;
            });
            setData(updatedData)
        }else{
            console.log("Failed to delete post:", res.status);
        }
    } catch (error) {
        console.log(error)
    }
   }

   const handleUpdataData=(curData)=> setUpdataData(curData)

    return <>
    <section className="section-form">
    <Form data={data} setData={setData} updataData={updataData} setUpdataData={setUpdataData}/>
    </section>
    <section className="post-section">
    <ol>
        {
            data.map((curData)=>{
                const {id,body,title} = curData;
                return(
                    <li key={id}>
                    <p>Title: {title}</p>
                    <p>Body : {body}</p>
                    <button onClick={()=>{handleUpdataData(curData)}}>Edit</button>
                    <button className="btn-delete" onClick={()=>{handleDelete(id)}}>Delete</button>
                </li>
                )
            })
        }
      </ol>
    </section>
    </>
}
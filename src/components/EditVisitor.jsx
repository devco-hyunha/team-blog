import { KEYS, readCollection, writeCollection } from '@/lib/storage';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditVisitor = () => {

  const {id}=useParams()
  const [EditContent, setEditContent]=useState({content:''});
  const navigate=useNavigate()

  useEffect(()=>{
    const post = readCollection(KEYS.visitors) || []
    const currentPost=post.find((i)=>(i.id.toString()=== id.toString() ))
    
    if(currentPost){
      setEditContent(currentPost)
    }

  },[id])

  const EditPost=()=>{
    const posts= readCollection(KEYS.visitors)
    const editPost=posts.map((cnt)=>cnt.id.toString()===id.toString()? {...cnt, content:EditContent.content, writeid:cnt.id} : cnt) 
    writeCollection(KEYS.visitors,editPost)
    alert('수정이 완료되었습니다.')
    navigate(-1)


  }


  return (
    <div>

    <h1> 게시글 수정</h1>
    <textarea placeholder='게시글 수정' value={EditContent.content} onChange={(e)=>setEditContent({...EditContent, content:e.target.value})} />
    <button onClick={EditPost}> 수정 </button>
    </div>
  )
}

export default EditVisitor
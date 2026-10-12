import { createId, findUser, KEYS, readCollection } from '@/lib/storage'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Visitor = () => {
    const [content,setContent] = useState('') //방명록내용
    const [currentUser,setCurrentUser] = useState(null) //로그인한 사용자 기본값
    const [post,setPost]=useState([]) //방명록 글목록



    useEffect(()=>{
         const post=readCollection(KEYS.visitors)
         setPost(post)
         const loginUser=findUser(user)
         setCurrentUser(loginUser)

    },[])
    

   

    const addContent=()=>{
        const newContent={id: createId(), content:content, writeId:currentUser}
        setPost(post.push(newContent))
    }
    
    const delv=(id)=>{
        const lists=post.filter((post)=>post.id !== id)
    }




  return (
    <div>
        <textarea placeholder='내용을 입력하세요!' value={content} onChange={(e)=> setContent(e.target.value)} />
            <button onClick={addContent}>방명록 남기기</button>

            <div>
                {post.map((post)=>(
                   <Fragment key={post.id}>
                        <div> {post.content} </div>
                        <div>{post.writeId} </div>
                        {currentUser && content.writeId === currentUser.userId && (
                            <>
                                <Link to={`/visitor/edit/${post.id}`}> 수정 </Link>
                                <button onClick={()=>delv(id)}>삭제</button>
                            </>
                        )}
                   </Fragment> 
                ))}

            </div>
            <div>
            
            </div>
        


    </div>
  )
}

export default Visitor
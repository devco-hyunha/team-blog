import useAuth from '@/hooks/useAuth'
import { createId, findUser, KEYS, readCollection, writeCollection } from '@/lib/storage'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Visitor = () => {
    const { isAuthenticated, user } = useAuth()
    const [content,setContent] = useState('') //방명록내용
    const [currentUser,setCurrentUser] = useState(null) //로그인한 사용자 기본값
    const [post,setPost]=useState([]) //방명록 글목록


    useEffect(()=>{
         const posts=readCollection(KEYS.visitors) || []

         console.log(posts)
         setPost(posts)
         setCurrentUser(user)

    },[user])
    

   

    const addContent=()=>{
        const newContent={id: createId(), content:content, writeid:currentUser.id}

        const newPost = [...post, newContent]; 
        setPost(newPost);
        writeCollection(KEYS.visitors, newPost);
        setContent('')
        alert('방명록이 등록되었습니다.')
    }
    
    const delv=(id)=>{
        const lists=post.filter((posts)=>posts.id !== id)
        setPost(lists)
        writeCollection(KEYS.visitors, lists)
        alert('방명록이 삭제되었습니다.')

    }




  return (
    <div>
        <textarea placeholder='내용을 입력하세요!' value={content} onChange={(e)=> setContent(e.target.value)} />
            <button onClick={addContent}>방명록 남기기</button>

            <div>
                {post.map((lists)=>(
                   <Fragment key={lists.id}>
                        <div> {lists.content} </div>
                        <div>{lists.writeId} </div>
                        {currentUser && lists.writeId === currentUser.Id && (
                            <>
                                <Link to={`/visitor/edit/${lists.id}`}> 수정 </Link>
                                <button onClick={()=>delv(lists.id)}>삭제</button>
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
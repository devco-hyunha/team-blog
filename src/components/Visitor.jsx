import useAuth from '@/hooks/useAuth'
import { createId, KEYS, readCollection, writeCollection } from '@/lib/storage'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Visitor = () => {
  const { isAuthenticated, user } = useAuth()
  const [content, setContent] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [post, setPost] = useState([])

  useEffect(() => {
    const posts = readCollection(KEYS.visitors) || []
    setPost(posts)
    setCurrentUser(user)
  }, [user])

  const addContent = () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요!')
      return
    }
    const newContent = { id: createId(), content: content,username:currentUser.name, writeId: currentUser?.id || '비회원' }
    const newPost = [...post, newContent];
    setPost(newPost);
    writeCollection(KEYS.visitors, newPost);
    setContent('')
    alert('방명록이 등록되었습니다.')
  }

  const delv = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const lists = post.filter((posts) => posts.id !== id)
      setPost(lists)
      writeCollection(KEYS.visitors, lists)
      alert('방명록이 삭제되었습니다.')
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-50 min-h-screen">
      {/* 헤더 타이틀 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-wide">📒 방명록</h1>
        <p className="text-sm text-slate-500 mt-2">소중한 발자취와 따뜻한 한마디를 남겨주세요.</p>
      </div>

      {/* 작성 영역 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <textarea 
          placeholder="오늘의 이야기나 따뜻한 응원을 남겨보세요..." 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          className="w-full h-28 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none text-slate-700 placeholder-slate-400"
        />
        <div className="flex justify-end mt-3">
          <button 
            onClick={addContent}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm shadow-indigo-100 transition-colors text-sm"
          >
            방명록 남기기 ✨
          </button>
        </div>
      </div>

      {/* 방명록 목록 영역 */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-500 px-1">최근 남겨진 글 ({post.length})</h2>
        
        {post.length === 0 ? (
          <div className="text-center py-12 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
            첫 번째 발자취를 남겨보세요!
          </div>
        ) : (
          post.map((lists) => (
            <div key={lists.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 transition-all">
              {/* 상단: 작성자 정보 & 관리 버튼 */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 bg-indigo-50 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 uppercase">
                    {lists.writeId?.substring(0, 2)}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{lists.username}</span>
                </div>
                
                {/* 본인 글일 때만 보여주는 버튼 셋 */}
                {currentUser && lists.writeId === currentUser.id && (
                  <div className="flex items-center space-x-2 text-xs">
                    <Link 
                      to={`/visitor/edit/${lists.id}`}
                      className="px-2.5 py-1 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                    >
                      수정
                    </Link>
                    <button 
                      onClick={() => delv(lists.id)}
                      className="px-2.5 py-1 text-rose-500 hover:bg-rose-50 rounded-md transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>

              {/* 하단: 내용 */}
              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap pl-9">
                {lists.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Visitor

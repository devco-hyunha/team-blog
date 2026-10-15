import { KEYS, readCollection, writeCollection } from '@/lib/storage';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditVisitor = () => {
  const { id } = useParams()
  const [EditContent, setEditContent] = useState({ content: '' });
  const navigate = useNavigate()

  useEffect(() => {
    const post = readCollection(KEYS.visitors) || []
    const currentPost = post.find((i) => i.id.toString() === id.toString())
    
    if (currentPost) {
      setEditContent(currentPost)
    }
  }, [id])

  const EditPost = () => {
    if (!EditContent.content.trim()) {
      alert('내용을 입력해주세요!')
      return
    }

    const posts = readCollection(KEYS.visitors) || []
    // 버그 수정: writeid를 cnt.id로 잘못 덮어쓰던 부분을 원래 데이터({...cnt})가 유지되도록 변경
    const editPost = posts.map((cnt) => 
      cnt.id.toString() === id.toString() 
        ? { ...cnt, content: EditContent.content } 
        : cnt
    ) 
    
    writeCollection(KEYS.visitors, editPost)
    alert('수정이 완료되었습니다.')
    navigate(-1)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-slate-50 min-h-screen">
      {/* 헤더 타이틀 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-wide">✏️ 방명록 수정</h1>
        <p className="text-sm text-slate-500 mt-2">남기셨던 소중한 이야기를 수정합니다.</p>
      </div>

      {/* 수정 영역 카드 */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
        <textarea 
          placeholder="게시글 수정" 
          value={EditContent.content} 
          onChange={(e) => setEditContent({ ...EditContent, content: e.target.value })} 
          className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none text-slate-700 placeholder-slate-400"
        />
        
        {/* 하단 버튼 컨트롤 세트 */}
        <div className="flex justify-end items-center space-x-2 mt-4">
          <button 
            onClick={() => navigate(-1)} 
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-xl transition-colors text-sm"
          >
            취소
          </button>
          <button 
            onClick={EditPost} 
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm shadow-indigo-100 transition-colors text-sm"
          >
            수정 완료 ✨
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditVisitor

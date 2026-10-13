import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { KEYS, readCollection, writeCollection, createId } from '../lib/storage'

/**
 * 블로그 글 작성 페이지 (/post/create)
 * @description
 * - 제목, 내용을 입력받아 localStorage(KEYS.posts)에 저장
 * - 저장되는 글 객체 모양 (팀 공통 계약):
 *   { id, title, content, authorId, authorName, createdAt, updatedAt }
 * - 저장이 끝나면 글 상세 페이지(/post/detail/:id)로 이동
 */
const CreatePostPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }

    const now = new Date().toISOString()
    const newPost = {
      id: createId(),
      title: title.trim(),
      content: content.trim(),
      authorId: user.id,
      authorName: user.name,
      createdAt: now,
      updatedAt: now,
    }

    // 최신 글이 목록 맨 위에 오도록 앞에 추가
    const posts = readCollection(KEYS.posts)
    writeCollection(KEYS.posts, [newPost, ...posts])

    navigate(`/post/detail/${newPost.id}`)
  }

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">글 쓰기</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="title" className="block text-sm font-medium">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="content" className="block text-sm font-medium">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={12}
            className="w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-brand-500 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-2 text-sm"
          >
            취소
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white"
          >
            등록
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePostPage

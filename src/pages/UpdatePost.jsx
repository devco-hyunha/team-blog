import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { KEYS, readCollection, writeCollection } from '../lib/storage'

/**
 * 블로그 글 수정 페이지 (/update/:id)
 * @description
 * - URL의 id로 localStorage(KEYS.posts)에서 글을 찾아 폼에 채움
 * - 수정 후 저장하면 해당 글의 title, content, updatedAt만 갱신
 * - 작성자 본인만 수정 가능
 */
const UpdatePostPage = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  // 처음 렌더링될 때 한 번만 localStorage에서 글을 찾는다
  const [post] = useState(() =>
    readCollection(KEYS.posts).find((p) => p.id === id) ?? null,
  )
  const [title, setTitle] = useState(post?.title ?? '')
  const [content, setContent] = useState(post?.content ?? '')
  const [error, setError] = useState('')

  if (!post) {
    return (
      <section className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">글을 찾을 수 없습니다</h1>
        <Link to="/" className="text-brand-500 underline">
          목록으로 돌아가기
        </Link>
      </section>
    )
  }

  if (post.authorId !== user.id) {
    return (
      <section className="mx-auto max-w-2xl space-y-4">
        <h1 className="text-2xl font-bold">수정 권한이 없습니다</h1>
        <p className="text-slate-600">작성자 본인만 글을 수정할 수 있어요.</p>
        <Link to={`/post/detail/${post.id}`} className="text-brand-500 underline">
          글로 돌아가기
        </Link>
      </section>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.')
      return
    }

    const posts = readCollection(KEYS.posts)
    const updated = posts.map((p) =>
      p.id === id
        ? {
            ...p,
            title: title.trim(),
            content: content.trim(),
            updatedAt: new Date().toISOString(),
          }
        : p,
    )
    writeCollection(KEYS.posts, updated)

    navigate(`/post/detail/${id}`)
  }

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">글 수정</h1>

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
            저장
          </button>
        </div>
      </form>
    </section>
  )
}

export default UpdatePostPage
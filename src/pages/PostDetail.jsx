import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { KEYS, readCollection, writeCollection, formatDate } from '../lib/storage'
import useAuth from '../hooks/useAuth'

const PostDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user: currentUser } = useAuth()

  const [post, setPost] = useState(null)

  useEffect(() => {
    const posts = readCollection(KEYS.posts)
    const foundPost = posts.find((p) => p.id === id)
    
    if (foundPost) {
      setPost(foundPost)
    }
  }, [id])

  // 글 삭제 핸들러
  const handleDelete = () => {
    if (!window.confirm('정말 이 글을 삭제하시겠습니까?')) return

    const posts = readCollection(KEYS.posts)
    const updatedPosts = posts.filter((p) => p.id !== id)
    
    writeCollection(KEYS.posts, updatedPosts)
    alert('게시글이 삭제되었습니다.')
    navigate('/')
  }

  // 이미 삭제했거나 없는 게시물의 주소로 이동했을 경우
  if (!post) {
    return (
      <div className="text-center py-12 text-slate-500">
        존재하지 않거나 삭제된 게시글입니다.
      </div>
    )
  }

  // 현재 로그인한 사용자가 글쓴이인지 확인
  const isOwner = !!(post && currentUser && post.authorId === currentUser.id);

  
  return (
    <article className="mx-auto max-w-2xl space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2 border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>작성자: {post.authorName}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <div className="min-h-200px whitespace-pre-wrap text-slate-700 leading-relaxed">
        {post.content}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <Link
          to="/"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          목록으로
        </Link> 

        {isOwner && (
          <div className="flex gap-2">
            <Link
              to={`/update/${post.id}`}
              className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              수정
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 cursor-pointer"
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </article>
  )
}

export default PostDetail
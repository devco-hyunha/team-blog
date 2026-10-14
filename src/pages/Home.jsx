import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { KEYS, readCollection, findUser, formatDate } from '../lib/storage'

const HomePage = () => {
  const [posts, setPosts] = useState([])
  
  // 화면에 처음에 보여줄 개수 (예: 4개)
  const [visibleCount, setVisibleCount] = useState(4)

  useEffect(() => {
    const loadedPosts = readCollection(KEYS.posts)
    
   // 최신 글이 상단에 오도록 정렬 기능 추가
    const sortedPosts = [...loadedPosts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )
    setPosts(sortedPosts)
  }, [])

  // '더보기 버튼'을 눌렀을 때 보여줄 개수를 10개씩 늘려주는 함수
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10)
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">게시물 목록</h1>
        <Link
          to="/post/create"
          className="rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:opacity-90 cursor-pointer"
        >
          글 쓰기
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-500">
          작성된 블로그 글이 없습니다. 첫 글을 작성해 보세요!
        </div>
      ) : (
        <div className="space-y-3">
          {posts.slice(0, visibleCount).map((post) => {
            const author = findUser(post.userId)

            return (
              <article
                key={post.id}
                className="rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">
                    <Link
                      to={`/post/detail/${post.id}`}
                      className="cursor-pointer text-slate-900 hover:text-brand-500 hover:underline transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="line-clamp-2 text-sm text-slate-600">
                    {post.content}
                  </p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                    <span>작성자: {post.authorName}</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </article>
            )
          })}

          {/* 아직 보여주지 않은 남은 글이 있을 때만 '더보기' 버튼 노출 */}
          {visibleCount < posts.length && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-md border border-slate-300 bg-white px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer shadow-sm"
              >
                더보기 ({visibleCount} / {posts.length})
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default HomePage

import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">블로그 글 목록</h1>
        <Link
          to="/post/create"
          className="rounded-md bg-brand-500 px-3 py-2 text-sm font-medium text-white"
        >
          글 쓰기
        </Link>
      </div>
    </section>
  )
}

export default HomePage
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="text-slate-600">요청한 페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="text-brand-500 underline">
        홈으로 돌아가기
      </Link>
    </section>
  )
}

export default NotFound
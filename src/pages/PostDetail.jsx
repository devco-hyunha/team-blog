import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PostDetailPage = () => {
  const { id } = useParams()
  const { user } = useAuth()

  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold"></h1>
    </article>
  )
}

export default PostDetailPage
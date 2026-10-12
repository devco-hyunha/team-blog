import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const UpdatePostPage = () => {
  const { id } = useParams()
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">글 수정</h1>
    </section>
  )
}

export default UpdatePostPage
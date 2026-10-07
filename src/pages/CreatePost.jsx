
import useAuth from '../hooks/useAuth'

const CreatePost = () => {
  const { user } = useAuth()


  return (
    <section>
      <h1 className="text-2xl font-bold">글 쓰기</h1>
    </section>
  )
}

export default CreatePost
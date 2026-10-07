import { Routes, Route } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostDetail from './pages/PostDetail'
import Visitor from './pages/Visitor'
import EditVisitor from './pages/EditVisitor'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="post/create" element={<CreatePost />} />
            <Route path="update/:id" element={<UpdatePost />} />
            <Route path="visitor/edit/:id" element={<EditVisitor />} />
          </Route>

          <Route path="post/detail/:id" element={<PostDetail />} />
          <Route path="visitor" element={<Visitor />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
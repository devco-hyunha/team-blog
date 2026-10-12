import { Routes, Route } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import CreatePostPage from './pages/CreatePost'
import UpdatePostPage from './pages/UpdatePost'
import PostDetailPage from './pages/PostDetail'
import VisitorPagePage from './pages/Visitor'
import EditVisitorPage from './pages/EditVisitor'
import NotFoundPage from './pages/NotFound'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="post/create" element={<CreatePostPage />} />
            <Route path="update/:id" element={<UpdatePostPage />} />
            <Route path="visitor/edit/:id" element={<EditVisitorPage />} />
          </Route>

          <Route path="post/detail/:id" element={<PostDetailPage />} />
          <Route path="visitor" element={<VisitorPagePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
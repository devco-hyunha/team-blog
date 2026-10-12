import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import Visitor from '@/components/Visitor'

const VisitorPage = () => {
  const { user } = useAuth()
  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">방명록</h1>
      <Visitor />
    </section>
  )
}

export default VisitorPage
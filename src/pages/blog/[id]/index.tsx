import { useRouter } from 'next/router'

const Index = () => {
    const router = useRouter()

  return (
    <div>
        <h1>halaman ini adalah halaman dengan id {router.query.id}</h1>
    </div>
  )
}

export default Index
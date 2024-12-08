import { Outlet, useLoaderData, useNavigation } from 'react-router-dom'
import { Footer, Header, Navbar, Loading } from '../components'
import { customFetch } from '../utils'
import { getToken } from '../utils/auth'
import { useEffect, useState } from 'react'

export const loader = async () => {
  const token = getToken()
  if (!token) return null
  try {
    const { data } = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
    return null
  }
}

const HomeLayout = () => {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'
  const data = useLoaderData()
  const [user, setUser] = useState(data?.user || null)

  useEffect(() => {
    setUser(data?.user || null)
  }, [data])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header user={user} setUser={setUser} />
        <Navbar />
        <main className="flex-grow">
          {isPageLoading ? (
            <Loading />
          ) : (
            <section className="align-element py-20">
              <Outlet context={{ user }} />
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}
export default HomeLayout

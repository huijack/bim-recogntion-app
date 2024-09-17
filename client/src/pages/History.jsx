import { Filters, SectionTitle, SessionsList } from '../components'
import { customFetch } from '../utils'

const url = '/sessions'

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  const response = await customFetch(url)
  const sessions = response.data
  return { sessions, params }
}

const History = () => {
  return (
    <>
      <SectionTitle text="past sessions" />
      <Filters />
      <SessionsList />
    </>
  )
}
export default History

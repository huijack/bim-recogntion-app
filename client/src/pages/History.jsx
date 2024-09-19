import { Filters, SectionTitle, SessionsList } from '../components'
import { customFetch } from '../utils'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const url = '/sessions'

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  const response = await customFetch(url)
  let sessions = response.data.sessions

  // Filter search query
  if (params.search) {
    sessions = sessions.filter((session) =>
      session.name.toLowerCase().includes(params.search.toLowerCase())
    )
  }

  // Filter date
  if (params.date) {
    const paramDate = day(params.date).format('YYYY-MM-DD')
    sessions = sessions.filter((session) => {
      const sessionDate = day(session.createdAt).format('YYYY-MM-DD')
      return sessionDate === paramDate
    })
  }

  // Sort by score
  if (params.score) {
    sessions = sessions.sort((a, b) => {
      return params.score === 'highest' ? b.score - a.score : a.score - b.score
    })
  }

  // Sort by order
  if (params.order) {
    sessions = sessions.sort((a, b) => {
      return params.order === 'a-z'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    })
  }

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

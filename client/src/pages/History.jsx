import {
  Filters,
  PaginationContainer,
  SectionTitle,
  SessionsList,
} from '../components'
import { customFetch } from '../utils'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { redirect, useLoaderData } from 'react-router-dom'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
import { createContext } from 'react'
day.extend(advancedFormat)

const url = '/sessions'

export const loader = async ({ request }) => {
  const token = getToken()
  if (!token) {
    toast.warning('Please log in to access this page.')
    return redirect('/login')
  }
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  const { data } = await customFetch.get(url, { params })
  return { data, sessions: data.sessions, searchValues: { ...params } }
}

const History = () => {
  const { data } = useLoaderData()
  const { pageCount } = data

  return (
    <>
      <SectionTitle text="past sessions" />
      <Filters />
      <SessionsList />
      {pageCount > 1 && <PaginationContainer />}
    </>
  )
}
export default History

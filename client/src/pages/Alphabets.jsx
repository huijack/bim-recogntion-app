import { AlphabetsList, PaginationContainer, SectionTitle } from '../components'
import { customFetch } from '../utils'

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ])

  const { data } = await customFetch.get('/alphabets', { params })

  return { data, searchValues: { ...params } }
}

const Alphabets = () => {
  return (
    <>
      <SectionTitle text="alphabets" />
      <AlphabetsList />
      <PaginationContainer />
    </>
  )
}
export default Alphabets

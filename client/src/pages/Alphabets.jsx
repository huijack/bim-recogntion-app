import { useSearchParams } from 'react-router-dom'
import { AlphabetsList, PaginationContainer, SectionTitle } from '../components'
import { customFetch } from '../utils'
import { useQuery } from '@tanstack/react-query'

const url = '/alphabets'

const allAlphabetsQuery = (queryParams) => {
  const { page } = queryParams

  return {
    queryKey: ['alphabets', page ?? '1'],
    queryFn: async () => {
      const { data } = await customFetch(url, { params: { page } })
      return { data }
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])

    const { data } = await queryClient.ensureQueryData(
      allAlphabetsQuery(params)
    )

    return { data, searchValues: { ...params } }
  }

const Alphabets = () => {
  const [searchParams] = useSearchParams()
  const { page } = Object.fromEntries([...searchParams.entries()])

  const { data } = useQuery(allAlphabetsQuery({ page: page ?? '1' }))
  return (
    <>
      <SectionTitle text="alphabets" />
      <AlphabetsList data={data} />
      <PaginationContainer />
    </>
  )
}
export default Alphabets

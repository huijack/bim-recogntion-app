import { useQuery } from '@tanstack/react-query'
import { ChooseCard, Hero, NewsCard } from '../components'
import { customFetch } from '../utils/index'

const url = '/landing'

const landingQuery = {
  queryKey: ['landing'],
  queryFn: async () => {
    const { data } = await customFetch(url)
    return data
  },
}

export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(landingQuery)
  return data
}

const Landing = () => {
  const { data } = useQuery(landingQuery)
  const { reasons, news } = data
  return (
    <>
      <Hero />
      <ChooseCard reasons={reasons} />
      <NewsCard news={news} />
    </>
  )
}
export default Landing

import { ChooseCard, Hero, NewsCard } from '../components'
import { customFetch } from '../utils/index'

const REASONS_URL = '/landing/whySignMana'
const NEWS_URL = '/landing/newsAndTrends'

export const loader = async () => {
  const [reasonsResponse, newsResponse] = await Promise.all([
    customFetch(REASONS_URL),
    customFetch(NEWS_URL),
  ])

  const reasons = reasonsResponse.data
  const news = newsResponse.data
  return { reasons, news }
}

const Landing = () => {
  return (
    <>
      <Hero />
      <ChooseCard />
      <NewsCard />
    </>
  )
}
export default Landing

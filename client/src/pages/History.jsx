import { Filters, SectionTitle, SessionsList } from '../components'

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

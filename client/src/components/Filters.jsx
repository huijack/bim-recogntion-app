import { Form, Link, useLoaderData } from 'react-router-dom'
import FormInput from './FormInput'
import DateChoose from './DateChoose'
import FormSelect from './FormSelect'

const Filters = () => {
  const { searchValues } = useLoaderData()
  const { search, date, score, order } = searchValues

  return (
    <Form className="my-10 bg-base-200 rounded-md px-6 sm:px-8 py-4 grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 sm:items-center md:items-end">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search session"
        name="search"
        defaultValue={search}
      />
      {/* DATE SELECT */}
      <DateChoose label="session date" name="date" selectedDate={date} />
      {/* SCORE */}
      <FormSelect
        label="score"
        name="score"
        list={['highest', 'lowest']}
        defaultValue={score}
      />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={['a-z', 'z-a']}
        defaultValue={order}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary uppercase">
        search
      </button>
      <Link to="/history" className="btn btn-secondary uppercase">
        reset
      </Link>
    </Form>
  )
}
export default Filters

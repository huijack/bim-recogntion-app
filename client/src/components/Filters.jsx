import { Form, Link } from 'react-router-dom'
import FormInput from './FormInput'
import DateChoose from './DateChoose'
import TimeChoose from './TimeChoose'
import FormSelect from './FormSelect'

const Filters = () => {
  return (
    <Form className="my-10 bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3 sm:items-center md:items-end">
      {/* SEARCH */}
      <FormInput type="text" label="search session" name="search" />
      {/* DATE SELECT */}
      <DateChoose label="session date" name="date" />
      {/* TIME SELECT */}
      <TimeChoose label="session time" name="time" />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={['a-z', 'z-a', 'newest', 'oldest']}
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

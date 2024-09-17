import { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const DateChoose = ({ label, name, size, selectedDate }) => {
  const [startDate, setStartDate] = useState(new Date())

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize font-semibold">{label}</span>
      </label>
      <DatePicker
        className={`input input-bordered w-full ${size}`}
        dateFormat="dd/MM/yyyy"
        name={name}
        id={name}
        maxDate={new Date()}
        selected={selectedDate}
        onChange={(date) => setStartDate(date)}
        showYearDropdown
      />
    </div>
  )
}
export default DateChoose

import { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const TimeChoose = ({ label, name, size }) => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize font-semibold">{label}</span>
      </label>
      <DatePicker
        className={`input input-bordered w-full ${size}`}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        name={name}
        id={name}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  )
}
export default TimeChoose

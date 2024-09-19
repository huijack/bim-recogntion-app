import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import day from 'dayjs'

import 'react-datepicker/dist/react-datepicker.css'

const DateChoose = ({ label, name, size, selectedDate }) => {
  const [startDate, setSelectedDate] = useState(
    selectedDate ? new Date(selectedDate) : null
  )

  useEffect(() => {
    if (selectedDate) {
      setSelectedDate(new Date(selectedDate))
    } else {
      setSelectedDate(null)
    }
  }, [selectedDate])

  const handleDateChange = (date) => {
    if (!date) return ''
    setSelectedDate(date)
    return day(date).format('YYYY-MM-DD')
  }

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize font-semibold">{label}</span>
      </label>
      <DatePicker
        className={`input input-bordered w-full ${size}`}
        dateFormat="MM-dd-yyyy"
        name={name}
        id={name}
        maxDate={new Date()}
        selected={startDate}
        onChange={handleDateChange}
        showYearDropdown
        isClearable
      />
    </div>
  )
}
export default DateChoose

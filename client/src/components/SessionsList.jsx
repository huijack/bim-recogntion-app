import { BsThreeDots } from 'react-icons/bs'
import { useLoaderData } from 'react-router-dom'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const SessionsList = () => {
  const { sessions } = useLoaderData()

  const sessionsList = sessions.sessions

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="table table-zebra">
        {/* HEAD */}
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* BODY */}
          {sessionsList.map((session) => {
            const { _id: id, name, score, createdAt } = session
            const newDate = day(createdAt).format('hh:mm a - MMM Do, YYYY')
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{score.toString()}</td>
                <td>{newDate}</td>
                <td>
                  <button className="btn btn-sm btn-circle btn-accent">
                    <BsThreeDots />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default SessionsList

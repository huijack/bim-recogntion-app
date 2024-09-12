import { BsThreeDots } from 'react-icons/bs'

const SessionsList = () => {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Session Name</th>
            <th>Session Date</th>
            <th>Session Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Session 1</td>
            <td>01/01/2021</td>
            <td>10:00</td>
            <td>
              <button className="btn btn-sm btn-circle btn-accent">
                <BsThreeDots />
              </button>
            </td>
          </tr>
          <tr>
            <td>Session 2</td>
            <td>02/01/2021</td>
            <td>11:00</td>
            <td>
              <button className="btn btn-sm btn-circle btn-accent">
                <BsThreeDots />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
export default SessionsList

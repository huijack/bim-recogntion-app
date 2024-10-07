import { MdOutlineDelete } from 'react-icons/md'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
day.extend(advancedFormat)

const SessionsList = () => {
  const { sessions } = useLoaderData()

  return (
    <section>
      {sessions.length === 0 ? (
        <h5 className="mt-16 text-2xl">
          Sorry, no sessions matched your search...
        </h5>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="table table-zebra">
            {/* HEAD */}
            <thead>
              <tr>
                <th>Session Name</th>
                <th>Score</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* BODY */}
              {sessions.map((session) => {
                const { _id: id, name, score, status, createdAt } = session
                const newDate = day(createdAt).format('hh:mm a - MMM Do, YYYY')
                return (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{score.toString()}</td>
                    <td>{newDate}</td>
                    <td className="capitalize">{status}</td>
                    <td>
                      <Form method="POST" action={`../delete-session/${id}`}>
                        <button
                          type="submit"
                          className="gap-x-1 btn btn-xs sm:btn-sm btn-error flex-nowrap "
                        >
                          <input type="hidden" name="id" value={id} />
                          <span className="text-xs sm:text-sm">Delete</span>
                          <MdOutlineDelete className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </Form>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
export default SessionsList

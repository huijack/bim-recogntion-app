import { MdOutlineDelete } from 'react-icons/md'
import { Form, redirect, useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { getToken } from '../utils/auth'
import { toast } from 'react-toastify'
day.extend(advancedFormat)

export const action = async ({ request }) => {
  try {
    const formData = await request.formData()
    const id = formData.get('id')
    const response = await customFetch.delete(`/sessions/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    toast.success('Session deleted successfully.')
    return redirect('/history')
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      'Failed to delete the session. Please try again.'
    toast.error(errorMessage)
    return null
  }
}

const SessionsList = () => {
  const { sessions, params } = useLoaderData()

  if (sessions.length === 0) {
    return (
      <h5 className="mt-16 text-2xl">
        Sorry, no sessions matched your search...
      </h5>
    )
  }

  return (
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
                  <Form method="DELETE">
                    <button type="submit" className="btn btn-sm btn-error">
                      <input type="hidden" name="id" value={id} />
                      Delete
                      <MdOutlineDelete className="h-5 w-5" />
                    </button>
                  </Form>
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

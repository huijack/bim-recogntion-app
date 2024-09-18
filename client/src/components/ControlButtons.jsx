import { Form, redirect } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'

export const action = async ({ request, params }) => {
  const { id } = params
  try {
    console.log(id)

    const formData = await request.formData()
    const score = formData.get('score')
    const response = await customFetch.patch(
      `/sessions/${id}`,
      { score },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    toast.success('Session ended successfully.')
    return redirect('/history')
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg ||
      'Failed to end the session. Please try again.'
    toast.error(errorMessage)
    return null
  }
}

const ControlButtons = ({
  isDetecting,
  toggleDetection,
  sessionId,
  score,
  isLoading,
  error,
}) => {
  return (
    <Form method="PATCH" className="grid gap-y-10 w-full place-items-center">
      <input type="hidden" name="score" value={score} />
      <div className="flex gap-x-4">
        <button
          type="button"
          className="btn btn-primary capitalize"
          onClick={toggleDetection}
          disabled={isLoading || error}
        >
          {isDetecting ? 'Stop Detection' : 'Start Detection'}
        </button>
        <button type="submit" className="btn btn-accent capitalize">
          End Session
        </button>
      </div>
    </Form>
  )
}
export default ControlButtons

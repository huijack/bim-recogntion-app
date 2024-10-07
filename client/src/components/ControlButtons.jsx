import { Form, redirect } from 'react-router-dom'
import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'
import bimImage from '../assets/BIM-Alphabet.jpg'
import { BsCardImage } from 'react-icons/bs'

export const action = async ({ request, params }) => {
  const { id } = params
  try {
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
  score,
  isLoading,
  error,
}) => {
  return (
    <Form
      method="PATCH"
      className="grid grid-cols-2 sm:grid-cols-[auto_auto_1fr] gap-4 place-items-center"
    >
      <input type="hidden" name="score" value={score} />
      <button
        type="button"
        className="btn btn-sm sm:btn-md text-sm sm:text-base btn-primary capitalize"
        onClick={toggleDetection}
        disabled={isLoading || error}
      >
        {isDetecting ? 'Stop Detection' : 'Start Detection'}
      </button>
      <button
        type="submit"
        className="btn btn-sm sm:btn-md text-sm sm:text-base btn-secondary capitalize"
      >
        End Session
      </button>
      <label
        htmlFor="image-modal"
        className="btn btn-sm sm:btn-md text-sm sm:text-base btn-accent col-span-2 sm:col-span-1"
      >
        Show BIM Alphabet <BsCardImage className="w-4 h-4" />
      </label>
      <input type="checkbox" id="image-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <img src={bimImage} alt="BIM Alphabets" />
        </div>
        <label className="modal-backdrop" htmlFor="image-modal">
          Close
        </label>
      </div>
    </Form>
  )
}
export default ControlButtons

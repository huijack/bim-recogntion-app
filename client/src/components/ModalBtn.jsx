import { customFetch } from '../utils'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'
import { redirect } from 'react-router-dom'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries([...formData.entries()])

  if (data.dateOfBirth) {
    data.dateOfBirth = new Date(data.dateOfBirth)
  }

  try {
    const response = await customFetch.patch('/users/current-user', data)
    toast.success('Profile updated successfully.')
    return redirect('/profile')
  } catch (error) {
    const errorMessage =
      error?.response?.data?.msg || 'Failed to update profile.'
    toast.error(errorMessage)
    return error
  }
}

const ModalBtn = () => {
  return (
    <>
      <input type="checkbox" id="open-modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmation</h3>
          <p className="py-4">Are you sure you want to update your profile?</p>
          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-secondary uppercase font-semibold"
            >
              confirm
            </button>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="open-modal">
          Close
        </label>
      </div>
    </>
  )
}
export default ModalBtn

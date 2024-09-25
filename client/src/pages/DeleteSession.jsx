import { toast } from 'react-toastify'
import { customFetch } from '../utils'
import { redirect } from 'react-router-dom'
import { getToken } from '../utils/auth'

export const action = async ({ request }) => {
  try {
    const formData = await request.formData()
    const id = formData.get('id')
    const response = await customFetch.delete(`/sessions/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    toast.success('Session deleted successfully.')
  } catch (error) {
    console.log(error)

    const errorMessage =
      error?.response?.data?.msg ||
      'Failed to delete the session. Please try again.'
    toast.error(errorMessage)
  }
  return redirect('/history')
}

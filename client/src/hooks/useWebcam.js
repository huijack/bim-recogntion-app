import { useRef, useState, useCallback } from 'react'

const useWebcam = (setIsLoading) => {
  const webcamRef = useRef(null)
  const [error, setError] = useState(null)
  const [isPermissionGranted, setIsPermissionGranted] = useState(null)

  const handleUserMedia = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setIsPermissionGranted(true)
  }, [setIsLoading])

  const handleUserMediaError = useCallback(
    (error) => {
      setIsLoading(false)
      setError(error.message)
      setIsPermissionGranted(false)
    },
    [setIsLoading]
  )

  return {
    webcamRef,
    error,
    isPermissionGranted,
    setIsPermissionGranted,
    handleUserMedia,
    handleUserMediaError,
  }
}
export default useWebcam

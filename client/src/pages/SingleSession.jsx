import { useEffect, useState } from 'react'
import {
  SectionTitle,
  WordDisplay,
  DetectionCanvas,
  ControlButtons,
  WebCam,
} from '../components'
import { redirect, useLoaderData, useParams } from 'react-router-dom'
import { customFetch } from '../utils'
import { useDetection, useWordGame, useWebcam } from '../hooks'
import { toast } from 'react-toastify'
import { getToken } from '../utils/auth'

export const loader = async ({ params }) => {
  const token = getToken()
  if (!token) {
    toast.warning('Please log in to access this page.')
    return redirect('/login')
  }
  const { id } = params
  try {
    const response = await customFetch(`/sessions/${id}`)
    const { session } = response.data
    const { name, score, status } = session

    if (status === 'completed') {
      toast.error('Session already completed.')
      return redirect('/')
    }

    return { name, score }
  } catch (error) {
    toast.error('Session not found.')
    return redirect('/')
  }
}

const SingleSession = () => {
  const { id } = useParams()
  const { name, score: initialScore } = useLoaderData()
  const [isLoading, setIsLoading] = useState(true)

  const {
    webcamRef,
    error,
    isPermissionGranted,
    setIsPermissionGranted,
    handleUserMedia,
    handleUserMediaError,
  } = useWebcam(setIsLoading)

  const { canvasRef, isDetecting, toggleDetection, predictions } = useDetection(
    webcamRef,
    setIsLoading
  )
  const { currentWord, currentLetterIndex, score, checkDetectedLetter } =
    useWordGame(initialScore)

  useEffect(() => {
    if (predictions.length > 0) {
      const detectedClasses = predictions.map((pred) => pred.class)
      checkDetectedLetter(detectedClasses)
    }
  }, [predictions, checkDetectedLetter])

  return (
    <>
      <SectionTitle text={`Session name: ${name}`} />
      <div className="py-12 grid gap-y-10 place-items-center">
        <div className="relative sm:w-8/12 md:w-6/12">
          {isLoading ? (
            <div className="h-72 w-72 sm:h-96 sm:w-auto bg-primary-content grid place-items-center rounded-xl">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              {error && <div className="text-error-content">{error}</div>}
            </div>
          ) : (
            <>
              <WebCam
                webcamRef={webcamRef}
                onUserMedia={handleUserMedia}
                onUserMediaError={handleUserMediaError}
                isPermissionGranted={isPermissionGranted}
                setIsPermissionGranted={setIsPermissionGranted}
              />
              <DetectionCanvas canvasRef={canvasRef} />
            </>
          )}
        </div>

        <WordDisplay
          currentWord={currentWord}
          currentLetterIndex={currentLetterIndex}
          score={score}
        />

        <ControlButtons
          isDetecting={isDetecting}
          toggleDetection={toggleDetection}
          isLoading={isLoading}
          error={error}
          sessionId={id}
          score={score}
        />
      </div>
    </>
  )
}
export default SingleSession

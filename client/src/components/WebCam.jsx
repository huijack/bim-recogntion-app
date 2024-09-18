import { useCallback } from 'react'
import Webcam from 'react-webcam'

const WebCam = ({
  isPermissionGranted,
  setIsPermissionGranted,
  webcamRef,
  onUserMedia,
  onUserMediaError,
  className = 'h-full w-full object-cover rounded-xl',
  errorMessage = 'Camera permission not granted. Please allow the camera option in your browser.',
}) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }

  const handleUserMedia = useCallback(() => {
    setIsPermissionGranted(true)
    if (onUserMedia) onUserMedia()
  }, [setIsPermissionGranted, onUserMedia])

  const handleUserMediaError = useCallback(
    (error) => {
      setIsPermissionGranted(false)
      if (onUserMediaError) onUserMediaError(error)
    },
    [setIsPermissionGranted, onUserMediaError]
  )

  return (
    <>
      {isPermissionGranted !== false ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          className={className}
        />
      ) : (
        <div className="rounded-xl bg-base-content flex items-center justify-center max-w-full h-80 p-6">
          <p className="text-slate-50 text-center -tracking-tighter">
            {errorMessage}
          </p>
        </div>
      )}
    </>
  )
}

export default WebCam

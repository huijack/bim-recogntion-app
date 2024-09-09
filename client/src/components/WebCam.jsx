import { useCallback, useState } from 'react'
import Webcam from 'react-webcam'

const WebCam = ({ isPermissionGranted, setIsPermissionGranted }) => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
  }

  const handleUserMedia = useCallback(() => {
    setIsPermissionGranted(true)
  }, [])

  const handleUserMediaError = useCallback(() => {
    setIsPermissionGranted(false)
  }, [])

  return (
    <>
      {isPermissionGranted !== false ? (
        <Webcam
          audio={false}
          videoConstraints={videoConstraints}
          onUserMedia={handleUserMedia}
          onUserMediaError={handleUserMediaError}
          className="rounded-xl"
        />
      ) : (
        <div className="rounded-xl bg-base-content flex items-center justify-center max-w-full h-80 p-6">
          <p className="text-slate-50 text-center -tracking-tighter">
            Camera permission not granted. <br /> Please allow the camera option
            in your browser.
          </p>
        </div>
      )}
    </>
  )
}
export default WebCam

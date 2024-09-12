import { useRef, useState, useEffect, useCallback } from 'react'
import { FormTextArea, SectionTitle } from '../components'
import { Form } from 'react-router-dom'
import Webcam from 'react-webcam'

const SingleSession = () => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const detectFrameRef = useRef(null)
  const modelRef = useRef(null)
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectedText, setDetectedText] = useState('')

  const drawPredictions = (predictions, canvas) => {
    const ctx = canvas.getContext('2d')
    predictions.forEach((prediction) => {
      const { x, y, width, height } = prediction.bbox

      // Draw bounding box
      ctx.strokeStyle = '#00FFFF'
      ctx.lineWidth = 4
      ctx.strokeRect(x - width / 2, y - height / 2, width, height)

      // Draw label
      ctx.fillStyle = '#00FFFF'
      ctx.font = 'bold 18px Arial'
      ctx.fillText(
        `${prediction.class} (${Math.round(prediction.confidence * 100)}%)`,
        x - width / 2,
        y - height / 2 - 5
      )
    })
  }

  const detectFrame = useCallback(
    async (model) => {
      if (!isDetecting) return

      if (webcamRef.current && canvasRef.current && model) {
        const video = webcamRef.current.video
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        if (
          video.readyState === video.HAVE_ENOUGH_DATA &&
          video.videoWidth > 0 &&
          video.videoHeight > 0
        ) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
          try {
            const results = await model.detect(canvas)
            setPredictions(results)

            const newDetectedText = results
              .map((pred) => `${pred.class}`)
              .join(', ')

            setDetectedText((prevText) =>
              prevText ? `${prevText}${newDetectedText}` : newDetectedText
            )

            drawPredictions(results, canvas)
            // draw labelling bounding boxes
          } catch (error) {
            console.error(`Error during detection: ${error}`)
            setError(
              'An error occurred during detection. Please refresh and try again.'
            )
          }
        }
      }
      detectFrameRef.current = requestAnimationFrame(() => detectFrame(model))
    },
    [isDetecting]
  )

  useEffect(() => {
    const loadModel = async () => {
      try {
        modelRef.current = await window.roboflow
          .auth({
            publishable_key: import.meta.env.VITE_ROBOFLOW_PUBLISHABLE_KEY,
          })
          .load({
            model: 'bim-recognition-x7qsz',
            version: 7,
          })
        setIsLoading(false)
      } catch (error) {
        console.error(`Error loading model: ${error}`)
        setError('Failed to load the model. Please try again.')
        setIsLoading(false)
      }
    }

    loadModel()

    return () => {
      if (detectFrameRef.current) {
        cancelAnimationFrame(detectFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!error && isDetecting && modelRef.current) {
      detectFrame(modelRef.current)
    }
    return () => {
      if (detectFrameRef.current) {
        cancelAnimationFrame(detectFrameRef.current)
      }
    }
  }, [error, isDetecting, detectFrame])

  const handleToggleDetection = () => {
    setIsDetecting((prevState) => !prevState)
  }

  return (
    <>
      <SectionTitle text={`Session name: #####`} />
      <div className="py-12 grid gap-y-10 place-items-center">
        <div className="relative sm:w-8/12 md:w-6/12">
          {isLoading ? (
            <div className="h-96 bg-primary-content grid place-items-center rounded-xl">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                className="h-full w-full object-cover rounded-xl"
                onUserMedia={() => setError(null)}
              />
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 h-full w-full object-cover rounded-xl"
                style={{ zIndex: 10 }}
              />
            </>
          )}
        </div>

        {error && (
          <div className="h-96 w-full bg-primary-content grid place-items-center rounded-xl">
            <div className="bg-error text-error-content">{error}</div>
          </div>
        )}

        <Form method="POST" className="grid gap-y-10 w-full place-items-center">
          <div className="flex gap-x-4">
            <button
              type="button"
              className="btn btn-primary capitalize"
              onClick={handleToggleDetection}
              disabled={isLoading}
            >
              {isDetecting ? 'stop detection' : 'start detection'}
            </button>
            <button type="submit" className="btn btn-accent capitalize">
              end session
            </button>
          </div>

          <FormTextArea
            label="text output"
            name="output"
            readonly={true}
            className="w-full md:w-6/12"
            value={detectedText}
          />
        </Form>
      </div>
    </>
  )
}

export default SingleSession

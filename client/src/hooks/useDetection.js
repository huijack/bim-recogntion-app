import { useState, useRef, useCallback, useEffect } from 'react'
import { toast } from 'react-toastify'

const useDetection = (webcamRef, setIsLoading) => {
  const canvasRef = useRef(null)
  const detectFrameRef = useRef(null)
  const modelRef = useRef(null)
  const [predictions, setPredictions] = useState([])
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectedText, setDetectedText] = useState('')

  const drawPredictions = (predictions, canvas) => {
    const ctx = canvas.getContext('2d')
    predictions.forEach((prediction) => {
      const { x, y, width, height } = prediction.bbox

      ctx.strokeStyle = '#00FFFF'
      ctx.lineWidth = 4
      ctx.strokeRect(x - width / 2, y - height / 2, width, height)

      const text = `${prediction.class} (${Math.round(
        prediction.confidence * 100
      )}%)`

      ctx.fillStyle = '#00FFFF'
      ctx.font = 'bold 18px Arial'

      ctx.save()

      ctx.translate(x - width / 2, y - height / 2 - 5)
      ctx.scale(-1, 1)
      ctx.fillText(text, 0, 0)
      ctx.restore()
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

            const detectedClasses = results.map((pred) => pred.class)
            setDetectedText(detectedClasses.join(', '))

            drawPredictions(results, canvas)
          } catch (error) {
            console.error(`Error during detection: ${error}`)
            toast.error(
              'An error occurred during detection. Please refresh and try again.'
            )
          }
        }
      }
      detectFrameRef.current = requestAnimationFrame(() => detectFrame(model))
    },
    [isDetecting, webcamRef]
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
            version: 9,
          })
        setIsLoading(false)
      } catch (error) {
        console.error(`Error loading model: ${error}`)
        toast.error('Failed to load the model. Please try again.')
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
    if (isDetecting && modelRef.current) {
      detectFrame(modelRef.current)
    }
    return () => {
      if (detectFrameRef.current) {
        cancelAnimationFrame(detectFrameRef.current)
      }
    }
  }, [isDetecting, detectFrame])

  const toggleDetection = () => setIsDetecting((prev) => !prev)

  return {
    canvasRef,
    predictions,
    isDetecting,
    detectedText,
    toggleDetection,
  }
}

export default useDetection

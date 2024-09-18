const DetectionCanvas = ({ canvasRef }) => {
  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 h-full w-full object-cover rounded-xl"
      style={{ zIndex: 10 }}
    />
  )
}

export default DetectionCanvas

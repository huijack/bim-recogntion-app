const SectionTitle = ({ text, score }) => {
  return (
    <div
      className={`border-b border-base-300 pb-5 ${
        score ? 'flex justify-between items-center' : ''
      }`}
    >
      <h2 className="text-xl md:text-3xl font-medium tracking-wider capitalize">
        {text}
      </h2>
      {score && (
        <p className="text-xl md:text-3xl font-medium tracking-wider capitalize">
          {score}
        </p>
      )}
    </div>
  )
}
export default SectionTitle

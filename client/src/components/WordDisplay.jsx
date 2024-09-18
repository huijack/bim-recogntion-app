const WordDisplay = ({ currentWord, currentLetterIndex }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg md:text-2xl font-bold mb-2">
        Current Word: {currentWord.toUpperCase()}
      </h2>
      <p className="text-base md:text-xl">
        Sign the letter:{' '}
        <span className="font-bold text-primary">
          {currentWord[currentLetterIndex]}
        </span>
      </p>
    </div>
  )
}
export default WordDisplay

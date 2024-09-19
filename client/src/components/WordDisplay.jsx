const WordDisplay = ({ currentWord, currentLetterIndex, score }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg md:text-2xl font-bold mb-2">
        Current Word: {currentWord.toUpperCase()}
      </h2>
      <div className="flex gap-x-8 justify-center items-center">
        <p className="text-base md:text-xl">
          Sign the letter:{' '}
          <span className="font-bold text-primary">
            {currentWord[currentLetterIndex]}
          </span>
        </p>
        <h2 className="text-base md:text-xl">
          Score: <span className="font-bold text-accent">{score}</span>
        </h2>
      </div>
    </div>
  )
}
export default WordDisplay

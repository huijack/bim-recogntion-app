import { useState, useCallback, useEffect, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import debounce from 'lodash/debounce'

const useWordGame = (initialScore) => {
  const [currentWord, setCurrentWord] = useState('')
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [score, setScore] = useState(initialScore)
  const [wordCompleted, setWordCompleted] = useState(false)
  const debouncedCompletedWord = useRef(null)

  const fetchRandomWord = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://random-word-api.herokuapp.com/word'
      )
      const word = response.data[0]
      setCurrentWord(word)
      setCurrentLetterIndex(0)
      setWordCompleted(false)
    } catch (error) {
      console.log(`Error fetching random word: ${error}`)
      toast.error('Failed to fetch a random word. Please try again.')
    }
  }, [])

  const completeWord = useCallback(() => {
    if (!wordCompleted) {
      setScore((prevScore) => prevScore + 1)
      setWordCompleted(true)
      toast.success('Word completed! Fetching new word...')
      fetchRandomWord()
    }
  }, [wordCompleted, fetchRandomWord])

  useEffect(() => {
    debouncedCompletedWord.current = debounce(completeWord, 500)
    return () => {
      if (debouncedCompletedWord.current) {
        debouncedCompletedWord.current.cancel()
      }
    }
  }, [completeWord])

  useEffect(() => {
    fetchRandomWord()
  }, [fetchRandomWord])

  const checkDetectedLetter = useCallback(
    (detectedClasses) => {
      if (
        currentWord &&
        !wordCompleted &&
        detectedClasses.includes(currentWord[currentLetterIndex])
      ) {
        if (currentLetterIndex === currentWord.length - 1) {
          debouncedCompletedWord.current()
        } else {
          setCurrentLetterIndex((prevIndex) => prevIndex + 1)
        }
      }
    },
    [currentWord, currentLetterIndex, wordCompleted]
  )

  return {
    currentWord,
    currentLetterIndex,
    score,
    checkDetectedLetter,
  }
}

export default useWordGame

import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { sessions, data } = useLoaderData()
  const { currentPage, pageCount } = data

  const { pathname, search } = useLocation()
  const navigate = useNavigate()

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-sm sm:btn-md border-none join-item ${
          activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []
    // first button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    )

    // first dot
    if (currentPage > 2) {
      pageButtons.push(
        <button className="join-item btn btn-sm sm:btn-md" key="dots-1">
          ...
        </button>
      )
    }

    // active/current page
    if (currentPage != 1 && currentPage != pageCount) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      )
    }

    // last dot
    if (currentPage < pageCount - 1) {
      pageButtons.push(
        <button className="join-item btn btn-sm sm:btn-md" key="dots-2">
          ...
        </button>
      )
    }

    // last button
    pageButtons.push(
      addPageButton({
        pageNumber: pageCount,
        activeClass: currentPage === pageCount,
      })
    )

    return pageButtons
  }

  if (pageCount < 2 || sessions.length === 0) return null

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          type="button"
          className="btn btn-sm sm:btn-md join-item uppercase"
          onClick={() => {
            let prevPage = currentPage - 1
            if (prevPage < 1) prevPage = pageCount
            handlePageChange(prevPage)
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          type="button"
          className="btn btn-sm sm:btn-md join-item uppercase"
          onClick={() => {
            let nextPage = currentPage + 1
            if (nextPage > pageCount) nextPage = 1
            handlePageChange(nextPage)
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default PaginationContainer

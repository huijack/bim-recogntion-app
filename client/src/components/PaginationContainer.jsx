import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'

const PaginationContainer = () => {
  const { data } = useLoaderData()
  const { currentPage, pageCount } = data
  const pages = Array.from({ length: pageCount }, (_, index) => {
    return index + 1
  })
  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  if (pageCount < 2) return null

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
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn btn-sm sm:btn-md border-none join-item ${
                pageNumber === currentPage ? 'bg-base-300 border-base-300' : ''
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
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

import { Link, useLoaderData, useParams } from 'react-router-dom'
import { customFetch } from '../utils'
import { SectionTitle } from '../components'
import { useQuery } from '@tanstack/react-query'

const singleAlphabetQuery = (id) => {
  return {
    queryKey: ['alphabet', id],
    queryFn: async () => {
      const { data } = await customFetch(`/alphabets/${id}`)
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const data = await queryClient.ensureQueryData(
      singleAlphabetQuery(params.id)
    )
    return { alphabet: data.alphabet }
  }

const SingleAlphabet = () => {
  const { id } = useParams()
  const initialData = useLoaderData()

  const { data } = useQuery({
    ...singleAlphabetQuery(id),
    initialData: initialData,
  })

  const { title, image, url } = data.alphabet

  return (
    <section>
      <div className="text-base breadcrumbs mb-7">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/alphabets">Alphabets</Link>
          </li>
        </ul>
      </div>
      <SectionTitle text={title} />
      <div className="mt-14 grid sm:grid-cols-2 w-full gap-8 place-items-center">
        <img src={image} alt={title} className="rounded-xl h-72 sm:h-fit" />
        <iframe
          src={url}
          title={title}
          allowFullScreen
          className="h-72 sm:h-full sm:w-full"
        ></iframe>
      </div>
    </section>
  )
}
export default SingleAlphabet

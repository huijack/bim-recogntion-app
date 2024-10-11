import { Link, useLoaderData } from 'react-router-dom'
import { customFetch } from '../utils'
import { SectionTitle } from '../components'

export const loader = async ({ params }) => {
  const { id } = params
  try {
    const { data } = await customFetch.get(`/alphabets/${id}`)
    return { alphabet: data.alphabet }
  } catch (error) {
    console.log(error)
    return null
  }
}

const SingleAlphabet = () => {
  const { alphabet } = useLoaderData()
  const { title, image, url } = alphabet
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

import { useLoaderData, Link } from 'react-router-dom'

const AlphabetsList = () => {
  const { data } = useLoaderData()
  const { alphabets } = data

  return (
    <section className="pt-14 grid md:grid-cols-2 gap-8 justify-center items-center">
      {alphabets.map((alphabet) => {
        const { id, title, image } = alphabet
        return (
          <Link key={id} to={`/alphabets/${id}`}>
            <div className="card lg:card-side bg-base-100 shadow-lg hover:shadow-xl duration-300">
              <figure>
                <img
                  src={image}
                  alt={title}
                  className="w-full lg:h-48 lg:w-48 object-cover rounded"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{title}</p>
              </div>
            </div>
          </Link>
        )
      })}
    </section>
  )
}
export default AlphabetsList

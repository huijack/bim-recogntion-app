import SectionTitle from './SectionTitle'

const ChooseCard = ({ reasons }) => {
  return (
    <section className="pt-24">
      <SectionTitle text="why choose SignMana" />
      <div className="pt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {reasons.map((reason) => {
          const { id, title, description, image } = reason

          return (
            <div
              key={id}
              className="card bg-base100 shadow-xl hover:shadow-2xl transition duration-300 mx-auto"
            >
              <figure>
                <img
                  src={image}
                  alt={title}
                  className="h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default ChooseCard

import { useLoaderData } from 'react-router-dom'
import SectionTitle from './SectionTitle'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const NewsCard = () => {
  const { news } = useLoaderData()

  return (
    <section className="pt-24">
      <SectionTitle text="latest news and trends" />
      <div className="pt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => {
          const { id, date, title, image, url } = item
          const newDate = day(date).format('MMMM DD, YYYY')
          return (
            <a
              key={id}
              className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <figure className="px-5 pt-5">
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <p className="text-secondary font-semibold text-sm">
                  {newDate}
                </p>
                <h2 className="card-title capitalize tracking-wider">
                  {title}
                </h2>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Blog</div>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
export default NewsCard

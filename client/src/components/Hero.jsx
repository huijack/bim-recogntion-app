import { Link } from 'react-router-dom'
import HeroImg from '../assets/HeroImage.svg'

const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          Say Hello to Your Newly AI Sign Language Interpreter!
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          Built in 2024, this new Malaysian Sign Language Interpreter allows you
          to make sign gesture translations more convenient than ever
        </p>
        <div className="mt-8">
          <Link to="session" className="btn btn-primary uppercase px-5">
            try now
          </Link>
        </div>
      </div>
      <div className="hidden lg:block mx-auto p-4">
        <img src={HeroImg} className="max-w-[28rem]" />
      </div>
    </div>
  )
}
export default Hero

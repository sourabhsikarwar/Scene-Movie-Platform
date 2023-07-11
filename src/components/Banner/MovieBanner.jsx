import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Youtube from 'react-youtube'
import { Oval } from 'react-loader-spinner'
// for star rating convert number into star
import Star from '../SingleMovieCast/Star'
//  format price is used to format country currency
import FormatPrice from '../SingleMovieCast/FormatPrice'
import '../SingleMovieCast/style.css'
import { useParams } from 'react-router-dom'

const MovieBanner = (props) => {

  const { movieId, title } = useParams()
  const [playing, setPlaying] = useState(false)
  const [Movies, setMovies] = useState({})

  const [trailer, setTrailer] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)


  useEffect(() => {
    window.scrollTo(0, 0)
    update()
  }, [movieId])

  const update = async () => {
    setInitialLoading(true)
    await axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/api/movies/movie-banner/movie/${movieId}`
      )
      .then((res) => {
        setMovies(res.data.data)
        setInitialLoading(false)
      })
  }
  const handleTrailer = async () => {
    setInitialLoading(true)
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_DOMAIN}/api/movies/trailer/id/${movieId}`
    )

    if (data.data.videos && data.data.videos.results) {
      const trailer = data.data.videos.results.find(
        (vid) => vid.name === 'Official Trailer'
      )
      setTrailer(trailer ? trailer : data.data.videos.results[0])
      setPlaying(true)
    }

    // setMovie(data)
    setInitialLoading(false)
  }
  return (
    <>
      {!initialLoading ? (
        <section className='container movie-container '>
          <div className='grid grid-two-column'>
            <div className='product_image'>
              <img
                width={'60%'}
                className=' object-cover object-center rounded  pt-10'
                src={`https://image.tmdb.org/t/p/original/${Movies.poster_path}`}
                alt={Movies.title}
              />
            </div>
            <div className='product-data '>
              <h2 className='dark:text-white'>{Movies.title}</h2>
              <Star
                stars={Movies.vote_average / 2}
                reviews={Movies.vote_count}
              />
              <p className='product-data-price dark:text-dimWhite'>
                Revenue : <FormatPrice price={Movies.revenue} />
              </p>
              <p className='product-data-price product-data-real-price dark:text-dimWhite'>
                Release :{' '}
                {Movies.release_date.toString().split('-').reverse().join('-')}
              </p>
              <p className='dark:text-dimWhite'>{Movies.overview}</p>

              <div className='product-data-info '>
                <p className='dark:text-dimWhite'>
                  Available :
                  {Movies.production_countries.map((ele) => (
                    <span>{ele.name} </span>
                  ))}
                </p>
                <p className='dark:text-dimWhite'>
                  Languages :
                  {Movies.spoken_languages.map((ele) => (
                    <span>{ele.english_name} </span>
                  ))}
                </p>
                <p className='dark:text-dimWhite'>
                  Genres :{' '}
                  {Movies.genres.map((ele) => (
                    <span>{ele.name} </span>
                  ))}
                </p>
              </div>

              <hr />
              {playing ? (
                <div className='mx-auto'>
                  <Youtube
                    videoId={trailer.key}
                    className={'youtube amru'}
                    containerClassName={'youtube-container amru'}
                    opts={{
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button
                    onClick={() => setPlaying(false)}
                    className={'button close-video'}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className='flex my-4'>
                  <button
                    onClick={handleTrailer}
                    className='flex bg-blue-gradient text-black border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded'
                  >
                    Watch
                  </button>
                  <button className='rounded-full w-10 h-10 bg-white hover:bg-gray-100 duration-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4'>
                    <ion-icon name='heart'></ion-icon>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className='flex justify-center my-8'>
          <Oval
            height='50'
            width='50'
            color='grey'
            secondaryColor='grey'
            ariaLabel='loading'
          />
        </div>
      )}
    </>
  )
};

export default MovieBanner

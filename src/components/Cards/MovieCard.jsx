import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import CircleRating from '../circleRating/CircleRating';
import { useUserAuth } from '../../context/authContext';
import { database } from '../../firebase/firebaseConfig';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { Dialog, Transition } from '@headlessui/react';
import styles from '../../style.module.css'; // Assuming 'style.module.css' is your CSS module

const MovieCard = (props) => {
  const shareUrl = encodeURIComponent(props.movie.title);
  const shareTvUrl = encodeURIComponent(props.movie.name);
  const { user } = useUserAuth();
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const movieID = doc(database, 'users', `${user?.email}`);

  const saveShow = () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
    } else {
      alert('Please log in to save a movie');
    }
  };

  const handleSave = async () => {
    try {
      if (like) {
        await updateDoc(movieID, {
          savedShows: arrayUnion({
            id: props.movie.id,
            title: props.movie.title,
            img: props.movie.backdrop_path,
          }),
        });
      } else {
        await updateDoc(movieID, {
          savedShows: arrayRemove({
            id: props.movie.id,
            title: props.movie.title,
            img: props.movie.backdrop_path,
          }),
        });
      }
    } catch (error) {
      console.error('Error handling save:', error);
    }
  };

  useEffect(() => {
    handleSave();
  }, [like]);

  return (
    <>
      <div className={`shadow flex my-4 p-3 group`} key={props.movie.id}>
        <div
          className={`${styles.MovieCard} relative flex justify-start items-end p-4 duration-200 rounded-[6px]`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.movie.poster_path}), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundBlendMode: 'multiply',
          }}
        >
          <div
            className={`absolute w-[40px] h-[40px] right-0 top-0 cursor-pointer group-hover:flex hidden sidebar m-3 shadow`}
          >
            <div
              className='bg-blue-gradient w-full h-full rounded-full flex items-center justify-center'
              onClick={saveShow}
            >
              {like ? (
                <FaHeart className='text-white' size={24} />
              ) : (
                <FaRegHeart className='text-white' size={24} />
              )}
            </div>
          </div>
          {/* Share icon */}
          <div
            className={`absolute w-[40px] h-[40px] right-12 top-0 cursor-pointer group-hover:flex hidden sidebar m-3 shadow`}
          >
            <div
              className='bg-blue-gradient w-full h-full rounded-full flex items-center justify-center'
              onClick={() => setOpenFilter(!openFilter)}
            >
              <FaShareAlt className='text-white' size={22} />
            </div>
          </div>
          {props.type === 'movie' ? (
            <Link to={`/movie/${props.movie.title}/${props.movie.id}`}>
              <div className='w-full opacity-90 text-white text-md font-medium mt-2'>
                <p>{props.movie.title}</p>
                <CircleRating rating={props.movie.vote_average.toFixed(1)} />
              </div>
            </Link>
          ) : (
            <Link to={`/tv/${props.movie.name}/${props.movie.id}`}>
              <div className='w-full opacity-90 text-white text-md font-medium mt-2'>
                <p>{props.movie.name}</p>
                <CircleRating rating={props.movie.vote_average.toFixed(1)} />
              </div>
            </Link>
          )}
        </div>
      </div>
      {/* Pop-up code */}
      <Transition appear show={openFilter} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={() => setOpenFilter(false)}
        >
          {/* Dialog overlay */}
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex h-[30rem] items-center justify-center p-4 text-center'>
              {/* Dialog content */}
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel
                  className='w-9/12 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'
                  style={{
                    color: 'black',
                  }}
                >
                  <div className='flex items-start justify-between p-4 border-b rounded-t'>
                    <h3 className='text-xl font-semibold text-gray-900'>
                      Share To
                    </h3>
                    <button
                      type='button'
                      className='text-gray-900 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                      data-modal-hide='staticModal'
                      onClick={() => setOpenFilter(false)}
                    >
                      <svg
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* Share buttons */}
                  <div className='flex flex-wrap justify-start m-4 gap-2'>
                    <FacebookShareButton
                      hashtag={`sceneMoviePlatfrom #${props.movie.type === 'movie'
                        ? props.movie.title
                        : props.movie.name
                      }`}
                      url={`https://scene-movie-platform.vercel.app/${props.movie.type}/${props.movie.type === 'movie'
                        ? shareUrl
                        : shareTvUrl
                      }/${props.movie.id}`}
                    >
                      <FacebookIcon size={45} round={true} />
                    </FacebookShareButton>

                    <PinterestShareButton
                      description={`${props.movie.type === 'movie'
                        ? props.movie.title
                        : props.movie.name
                      } from Scene-movie-platform`}
                      media={`https://scene-movie-platform.vercel.app/${props.movie.type}/${props.movie.type === 'movie'
                        ? shareUrl
                        : shareTvUrl
                      }/${props.movie.id}`}
                    >
                      <PinterestIcon size={45} round={true} />
                    </PinterestShareButton>

                    <TwitterShareButton
                      url={`https://scene-movie-platform.vercel.app/${props.movie.type}/${props.movie.type === 'movie'
                        ? shareUrl
                        : shareTvUrl
                      }/${props.movie.id}`}
                    >
                      <TwitterIcon size={45} round={true} />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      title={`${props.movie.type === 'movie'
                        ? props.movie.title
                        : props.movie.name
                      }`}
                      url={`https://scene-movie-platform.vercel.app/${props.movie.type}/${props.movie.type === 'movie'
                        ? shareUrl
                        : shareTvUrl
                      }/${props.movie.id}`}
                    >
                      <LinkedinIcon size={45} round={true} />
                    </LinkedinShareButton>

                    <WhatsappShareButton
                      title={`${props.movie.type === 'movie'
                        ? props.movie.title
                        : props.movie.name
                      }`}
                      url={`https://scene-movie-platform.vercel.app/${props.movie.type}/${props.movie.type === 'movie'
                        ? shareUrl
                        : shareTvUrl
                      }/${props.movie.id}`}
                    >
                      <WhatsappIcon size={45} round={true} />
                    </WhatsappShareButton>
                    <TelegramShareButton
                      url={`https://scene-movie-platform.vercel.app/${props.movie.type}/${props.movie.type === 'movie'
                        ? shareUrl
                        : shareTvUrl
                      }/${props.movie.id}`}
                    >
                      <TelegramIcon size={45} round={true} />
                    </TelegramShareButton>
                    <RedditShareButton
                      title={`${props.movie.type === 'movie'
                        ? props.movie.title
                        : props.movie.name
                      }`}
                      url={`https://scene-movie-platform.vercel.app/${props.movie.type}/${props.movie.type === 'movie'
                        ? shareUrl
                        : shareTvUrl
                      }/${props.movie.id}`}
                    >
                      <RedditIcon size={45} round={true} />
                    </RedditShareButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MovieCard;

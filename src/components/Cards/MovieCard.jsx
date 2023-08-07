import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { useUserAuth } from "../../context/authContext";
import { database } from "../../firebase/firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import CircleRating from "../circleRating/CircleRating";
import dayjs from "dayjs";
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
} from "react-share";
import { Dialog, Transition } from "@headlessui/react";
import styles from "../../style";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const { user } = useUserAuth();
  const [like, setLike] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const movieID = doc(database, "users", `${user?.email}`);
  const shareUrl = encodeURIComponent(
    props.movie.title || props.movie.name
  );
  const { id, title, backdrop_path, poster_path, vote_average, release_date } =
    props.movie;

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
    } else {
      alert("Please log in to save a movie");
    }
  };

  const handleSave = async () => {
    const movieData = {
      id,
      title,
      img: backdrop_path,
    };

    if (like) {
      await updateDoc(movieID, {
        savedShows: arrayUnion(movieData),
      });
    } else {
      await updateDoc(movieID, {
        savedShows: arrayRemove(movieData),
      });
    }
  };

  useEffect(() => {
    handleSave();
  }, [like]);

  const renderSharingButtons = () => {
    return (
      <div className="flex flex-wrap justify-start m-4 gap-2 ">
        <FacebookShareButton
          hashtag={`sceneMoviePlatfrom #${
            props.type === "movie" ? title : name
          }`}
          url={`https://scene-movie-platform.vercel.app/${
            props.type
          }/${shareUrl}/${id}`}
        >
          <FacebookIcon size={45} round={true} />
        </FacebookShareButton>
        {/* Other sharing buttons... */}
      </div>
    );
  };

  return (
    <>
      <div className={`shadow flex my-4 p-3 group`} key={id}>
        <div
          className={`${styles.MovieCard} relative flex justify-start items-end p-4 duration-200 rounded-[6px]`}
          alt="movie poster"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path}), linear-gradient(0deg, #0D1117 0%, #161B22 10%, #0D1117 20%, transparent 100%)`,
            backgroundSize: "cover",
            backgroundPositionX: "center",
            backgroundBlendMode: "multiply",
          }}
        >
          {/* Like button */}
          <div
            className={`absolute w-[40px] h-[40px] right-0 top-0 cursor-pointer group-hover:flex hidden sidebar m-3 shadow`}
          >
            <div
              className="bg-blue-gradient w-full h-full rounded-full flex items-center justify-center"
              onClick={saveShow}
            >
              {like ? (
                <FaHeart className="text-white" size={24} />
              ) : (
                <FaRegHeart className="text-white" size={24} />
              )}
            </div>
          </div>
          {/* Share button */}
          <div
            className={`absolute w-[40px] h-[40px] right-12 top-0 cursor-pointer group-hover:flex hidden sidebar m-3 shadow`}
          >
            <div
              className="bg-blue-gradient w-full h-full rounded-full flex items-center justify-center"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <FaShareAlt className="text-white" size={22} />
            </div>
          </div>

          <Link to={`/${props.type}/${props.title}/${props.movie.id}`}>
              <div className="w-full opacity-90 text-white text-md font-medium mt-2 ">
                <p className="mb-2">{props.title}</p>
              </div>
              <div className="flex mb-[-38px]">
                <CircleRating rating={props.movie.vote_average.toFixed(1)} />
                <span
                  className="pl-[20px] right-3date text-dimWhite font-normal text-xs"
                >
                  {dayjs(props.movie.release_date).format("MMM D, YYYY")}
                </span>
              </div>
            </Link>

        </div>
      </div>
      {/* Share dialog */}
      <Transition appear show={openFilter} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenFilter(false)}
        >
          {/* Dialog background */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-[30rem] items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-9/12 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  style={{
                    color: "black",
                  }}
                >
                  {/* Share dialog header */}
                  <div class="flex items-start justify-between p-4 border-b rounded-t">
                    <h3 class="text-xl font-semibold text-gray-900">
                      Share To
                    </h3>
                    <button
                      type="button"
                      class="text-gray-900 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                      data-modal-hide="staticModal"
                      onClick={() => setOpenFilter(false)}
                    >
                      <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Close icon */}
                      </svg>
                    </button>
                  </div>
                  {/* Share buttons */}
                  {renderSharingButtons()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MovieCard;

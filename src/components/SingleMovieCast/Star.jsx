import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import "./style.css";
import styles from "../../style";

const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
        <span  key={index}>
            {
                stars>=index+1?<FaStar className='icon'/>:stars>=number?<FaStarHalfAlt  className='icon'/>:<AiOutlineStar  className='icon'/>
            }
        </span>
    )
  })
    return (
            <div className='icon-style '>
    {ratingStar}
    <p className='dark:text-dimWhite'>{reviews} Total reviews</p>
    </div>
  );
};
export default Star;

import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import styles from "../style";
import bg from "../assets/image/bg2.jpg"
import { useUserAuth } from "../context/authContext";


export const ResetPasswword = () => {
  const navigate = useNavigate()
  const { passwordReset } = useUserAuth();
  const [data, setData] = useState({
    email : 'test@gmail.com',
  })

  const [text, setText] = useState(null)

  const [error, setError] = useState('')

  const handleInputs = (e) => {
    let inputs = {[e.target.name] : e.target.value}

    setData({...data, ...inputs})
  }

  const handleReset = async (e) =>{
    e.preventDefault();
    setError('')
    try{
      setText("Password Reset Email Has Been Sent");
      await passwordReset(data.email);
      setData("");
      navigate("/login");
    } catch (err){
      setError(err.message)
    }
  }


  return (
    <section className="text-gray-600 body-font" style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPositionX: "center",
    }}>
      
      <div className={`${styles.boxWidth} mx-auto flex flex-wrap items-center md:px-0 px-8 h-max`}>
        <div className="lg:w-2/6 md:w-1/2 bg-primary rounded-lg p-8 flex flex-col md:mx-auto w-full my-16">
          <h2 className={`text-gradient ${styles.heading3} mb-4`} >
            Forgot Password
          </h2>
          { error && <p className="text-red-600">{error}</p>}
          <div className="relative mb-4">
            {text && <p className="text-rose-700">{text}</p>}
            <label htmlFor="email" className="leading-8 text-sm text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="xyz@gmail.com"
              className="w-full bg-white rounded border border-gray-900 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out z-0"
              onChange={e => {handleInputs(e)}}
            />
          </div>
          <button className="text-black bg-blue-gradient mt-2 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={(e)=>{handleReset(e)}}>
            Forgot Password
          </button>
          <hr className="border-gray-600 my-4"/>
          <div className="flex justify-between">
          <p className="leading-8 text-xs text-white">
            Already a member? Try <Link to="/login" className="text-gradient">
              Login
            </Link>
          </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPasswword;

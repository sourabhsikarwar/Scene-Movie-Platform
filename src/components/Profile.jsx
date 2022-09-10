import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../style";
import { auth } from '../firebase/firebaseConfig'

const Profile = () => {

  const userData = auth.currentUser;

  const [data, setData] = useState({
    name: "",
    email: userData.email,
    phone_no: "",
    birthday: "",
  });

  const handleInputs = (e) => {
    e.preventDefault()
    let inputs = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputs });
  };
  
  const handleSubmit = () => {

  }

  return (
    <section className="text-gray-600 body-font bg-primary">
      <div className="container max-w-7xl px-5 py-12 mx-auto flex flex-col items-center">
        <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:w-2/5 text-center sm:pr-8 sm:py-8">
            <div className="w-48 h-48 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-10 h-10"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex flex-col items-center text-center justify-center text-white">
              <h2
                className={`font-semibold title-font mt-4 ${styles.heading2}`}
              >
                Sourabh Sikarwar
              </h2>
              <div className="w-12 h-1 bg-blue-gradient rounded mt-2 mb-4"></div>
              <p className={`${styles.paragraph}`}>
                {userData.email}
              </p>
              <p className={`${styles.paragraph}`}>18/01/2022</p>
              <p className={`${styles.paragraph}`}>+91 8989151788</p>
            </div>
          </div>
          <div className="sm:w-3/5 sm:pl-8 sm:py-8 sm:border-l border-dimBlue sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-left">
            <div className="mx-auto w-2/3">
              <div className="flex flex-wrap m-2">
                <h2 className={`${styles.heading3} mb-2 text-gradient`}>Edit Profile</h2>
                <div className="my-2 w-full">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-dimWhite"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full bg-gray-100 rounded border border-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="my-2 w-full">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-dimWhite"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-100 rounded"
                    value={userData.email}
                  />
                </div>
                <div className="my-2 w-full">
                  <label
                    htmlFor="contact"
                    className="leading-7 text-sm text-dimWhite"
                  >
                    Contact no.
                  </label>
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    className="w-full bg-gray-100 rounded"
                  />
                </div>
                <div className="my-2 w-full">
                  <label
                    htmlFor="contact"
                    className="leading-7 text-sm text-dimWhite"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    className="w-full bg-gray-100 rounded"
                  />
                </div>
                <div className="my-2 w-full">
                  <button className={`${styles.button1} my-2`}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL, N_URL } from "../../../configs/base_url";
export default function Signup() {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tempDistricts, setTempDistricts] = useState([]);
  const [base64Image, setBase64Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [macAddress, setMacAddress] = useState("");
  const navigate = useNavigate();

  const getDivitions = () => {
    axios({
      method: "GET",
      url: `${BASE_URL}settings/divisions`,
    }).then((result) => {
      setDivisions(result.data.data);
    });
  };

  const getDistricts = () => {
    axios({
      method: "GET",
      url: `${BASE_URL}settings/districts`,
    }).then((result) => {
      setTempDistricts(result.data.data);
    });
  };

  const getDistrictByDivition = (div_id) => {
    setDistricts([]);
    const filteredDistrict = tempDistricts.filter(
      (dis) => dis.division_id == div_id
    );
    setDistricts(filteredDistrict);
  };

  const getBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const base64String = event.target.result;
        const base64 = base64String.split(",");
        setBase64Image(base64[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const getDeviceId = () => {
    axios({
      method: "GET",
      url: `${N_URL}get-device-id`,
    }).then((result) => {
      setMacAddress(result?.data?.en0[0]?.mac);
    });
  };

  useEffect(() => {
    getDeviceId();
    getDivitions();
    getDistricts();
  }, []);

  const signUpHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const dateofBirth = form.date_of_birth.value;
    const address = form.address.value;
    const district = form.districts.value;
    const division = form.divisions.value;
    const gender = form.gender.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    if (phone.length != 10) {
      return toast.error("Your phone-no should contain 10 digits!", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
        autoClose: 2000,
      });
    }

    if (password != confirm_password) {
      return toast.error("Password doesn't match!", {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnHover: false,
        autoClose: 2000,
      });
    }

    setLoading(true);

    try {
      const result = await axios.post(`${BASE_URL}user/signup`, {
        name: name,
        email: email,
        country_code: "+880",
        phone: phone,
        gender: gender,
        dob: dateofBirth,
        division_id: division,
        district_id: district,
        address: address,
        password: password,
        mac_address: macAddress,
        profile_photo: base64Image,
      });

      if (result.data.success) {
        toast.success("Registration successfull", {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
          autoClose: 1000,
        });
        localStorage.setItem("userToken", result.data.authorisation.token);
      }
    } catch (error) {
      console.log(error);
      if (!error?.response?.data?.success) {
        toast.error(error?.response?.data?.message, {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
          autoClose: 2000,
        });
      } else {
        toast.error("Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          pauseOnHover: false,
          autoClose: 2000,
        });
      }
    }
    setLoading(false);
  };

  return (
    <div
      className="flex w-full min-h-screen items-center justify-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1557018250-c58928b114a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80")',
      }}
    >
      <div className="max-w-2xl mx-auto rounded-xl bg-gray-800 bg-opacity-50 shadow-lg backdrop-blur-md p-16">
        <form onSubmit={signUpHandler}>
          <div className="flex justify-center mb-4"></div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                required
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-3"
                placeholder="name"
              />
            </div>
            <div>
              <label
                htmlFor="profile_photo"
                className="block mb-2 text-sm font-medium text-white"
              >
                Profile Photo
              </label>
              <input
                required
                type="file"
                onChange={getBase64}
                name="profile_photo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 "
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                placeholder="email"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-white"
              >
                Phone number
              </label>
              <div className="flex">
                <input
                  required
                  type="text"
                  className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg p-2.5"
                  placeholder="+880"
                  max="10"
                  min={10}
                  disabled
                />
                <input
                  type="text"
                  name="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-smnpm  rounded-r-lg w-full p-2.5 "
                  placeholder="phone-no"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="divisions"
                className="block mb-2 text-sm font-medium text-white"
              >
                Division
              </label>
              <select
                onChange={(e) => getDistrictByDivition(e.target.value)}
                required
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm p-[10px] w-full rounded-lg"
                name="divisions"
                defaultValue="0"
              >
                <option value="0" disabled>
                  Choose division
                </option>
                {divisions.map((div, idx) => (
                  <option key={idx} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="districts"
                className="block mb-2 text-sm font-medium text-white"
              >
                District
              </label>
              <select
                required
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm p-[11px] w-full rounded-lg"
                name="districts"
                defaultValue="0"
              >
                <option value="0" disabled>
                  Choose district
                </option>
                {districts.map((dis, idx) => (
                  <option key={idx} value={dis.id}>
                    {dis.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-white"
              >
                Gender
              </label>
              <select
                required
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm p-[11px] w-full rounded-lg"
                name="gender"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-white"
              >
                Date of Birth
              </label>
              <input
                required
                type="date"
                name="date_of_birth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <input
                required
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-3 "
                placeholder="•••••••••"
              />
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirm password
              </label>
              <input
                required
                type="password"
                name="confirm_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3 "
                placeholder="•••••••••"
              />
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Address
            </label>
            <input
              required
              type="text"
              name="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
              placeholder="address"
            />
          </div>

          <div className="flex items-start  my-6">
            <div className="flex items-center h-5">
              <input
                onChange={() => {
                  isChecked ? setIsChecked(false) : setIsChecked(true);
                  !isChecked ? setShowModal(true) : null;
                }}
                id=""
                checked={isChecked}
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
              />
            </div>
            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-gray-900 "
            >
              I agree with the -{" "}
              <a className="text-white  hover:underline ">
                terms and conditions
              </a>
              .
            </label>
          </div>

          <div className="flex flex-col mt-4 gap-2 justify-between ">
            {loading ? (
              <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                <span className="loading loading-spinner loading-sm"></span>
              </button>
            ) : (
              <button
                disabled={!isChecked}
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Register
              </button>
            )}

            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-white"
            >
              
            </label>
          </div>
        </form>
      </div>
      {/* modal */}
      <dialog
        id="my_modal_5"
        className="modal modal-middle backdrop-brightness-50"
        open={showModal}
      >
        <div className="modal-box">
          <h3 className="font-bold text-xl">ডিসক্লেইমার:</h3>
          <hr className="mb-3" />
          <p className="py-4">
            কোরিয়ান ইপিএস টপিক পরীক্ষা ( ইউবিটি/সিবিট/ অন্যান্য) এর জন্য এই
            মোবাইল অ্যাপটি কেবল নিবন্ধনকারীদের ব্যক্তিগতভাবে ব্যবহারের জন্য ।
            বিষয়টি বুঝার জন্য অ্যাপটি ব্যবহারের পূর্বেই অনুগ্রহ করে নিম্নলিখিত
            বিষয়াবলী মনোযোগ সহকারে পড়ুন । ডিভাইস নিবন্ধন: আপনি প্রথমে যে
            ডিভাইসটি দিয়ে রেজিস্ট্রেশন করবেন সে ডিভাইসটি আমাদের ডাটাবেজে
            নিবন্ধিত ডিভাইস বলে বিবেচিত হবে। এই নিবন্ধিত ডিভাইসই হল প্রিমিয়াম
            সামগ্রী অ্যাক্সেস করার জন্য একমাত্র অনুমোদিত মাধ্যম। পরবর্তীতে
            প্রিমিয়াম প্রশ্ন সেট অ্যাক্সেস করতে, ব্যবহারকারীদের সদস্যতা
            প্রক্রিয়া বজায় রাখতে নিবন্ধিত ডিভাইসে অ্যাপটি ব্যবহার করতে হবে।
            অনিবন্ধিত ডিভাইস বা অননুমোদিত অ্যাক্সেস করার কোনো প্রচেষ্টা করলে
            আপনার মুল্যবান অ্যাকাউন্টটি সাসপেনশন হয়ে যাবে।
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className="btn btn-primary"
              >
                I understand
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </div>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../config/store";
import { useNavigate } from "react-router-dom";
import { showResponseMsg } from "../reducers/ResponseMsgReducer";
import userService from "../services/userService";

const UserRegisterForm = () => {
  const navigate = useNavigate();

  const [userCredentialData, setUserCredentialData] = useState({
    username: "",
    email: "",
    password: "",
    reconfirmPassword: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const handleUserNameChange = (e: React.FormEvent) => {
    setUserCredentialData({
      ...userCredentialData,
      username: (e.target as HTMLInputElement).value,
    });
  };

  const handleEmailChange = (e: React.FormEvent) => {
    setUserCredentialData({
      ...userCredentialData,
      email: (e.target as HTMLInputElement).value,
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    setUserCredentialData({
      ...userCredentialData,
      password: (e.target as HTMLInputElement).value,
    });
  };

  const handleReconfirmPasswordChange = (e: React.FormEvent) => {
    setUserCredentialData({
      ...userCredentialData,
      reconfirmPassword: (e.target as HTMLInputElement).value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await userService.register({ ...userCredentialData });
      dispatch(
        showResponseMsg({
          isSuccess: true,
          message: "User Created !",
        })
      );
    } catch (err) {
      dispatch(
        showResponseMsg({
          isSuccess: false,
          message: "Please Input Valid Form Values",
        })
      );
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        User Registration Form
      </h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Login Email
        </label>
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          User Name
        </label>
        <input
          type="text"
          placeholder="username"
          onChange={handleUserNameChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <label
          htmlFor="reconfirmPassword"
          className="block text-sm font-medium text-gray-700"
        >
          Reconfirm Password
        </label>
        <input
          type="password"
          placeholder="Reconfirm Password"
          onChange={handleReconfirmPasswordChange}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
        <div className="flex justify-between pt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 w-full ml-2"
          >
            Register
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 w-full ml-2"
            onClick={handleCancel}
          >
            Back to Forum
          </button>
        </div>
      </form>
    </>
  );
};

export default UserRegisterForm;
